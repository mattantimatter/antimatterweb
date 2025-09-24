import { NextResponse } from "next/server";

// Ensure Node runtime on Vercel for external fetch + timeouts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function fetchHtmlSnippet(url: string): Promise<{ snippet: string; headers: Record<string, string>; fetchMs: number }> {
  try {
    const start = Date.now();
    const resp = await fetch(url, {
      headers: { "User-Agent": "AntimatterAI-SiteAudit/1.0" },
      cache: "no-store",
    });
    const fetchMs = Date.now() - start;
    if (!resp.ok) return { snippet: "", headers: {}, fetchMs } as { snippet: string; headers: Record<string, string>; fetchMs: number };
    const html = await resp.text();
    const headers: Record<string, string> = {
      "server": resp.headers.get("server") || "",
      "x-powered-by": resp.headers.get("x-powered-by") || "",
      "content-type": resp.headers.get("content-type") || "",
      "content-length": resp.headers.get("content-length") || String(html.length),
    };
    return { snippet: html.replace(/\s+/g, " ").slice(0, 8000), headers, fetchMs } as const;
  } catch {
    return { snippet: "", headers: {}, fetchMs: 0 };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { websiteUrl, industry, name, title } = body as {
      websiteUrl?: string;
      industry?: string;
      name?: string;
      title?: string;
    };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing OPENAI_API_KEY. Add it to .env.local." },
        { status: 500 }
      );
    }

    const url = (websiteUrl || "").trim();
    if (!url) {
      return NextResponse.json({ error: "Missing websiteUrl" }, { status: 400 });
    }
    let normalized = url;
    if (!/^https?:\/\//i.test(normalized)) normalized = `https://${normalized}`;
    try {
      // Validate URL
      // eslint-disable-next-line no-new
      new URL(normalized);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const { snippet, headers, fetchMs } = await fetchHtmlSnippet(normalized);

    // Compose prompts for separate domains
    const sharedContext = `Audience Industry: ${industry || "(unspecified)"}\nRequester: ${name || "(unspecified)"}${title ? ", " + title : ""}\nTarget URL: ${normalized}\nFetch Meta: first_byte_ms≈${fetchMs}, headers=${JSON.stringify(
      headers
    )}\nWebsite HTML snippet (truncated):\n${snippet}`;

    const prompts = {
      seo:
        "You are an enterprise SEO lead. Return strictly semantic HTML for <section data-part=seo> with <h2>SEO</h2> including: crawl/indexability, metadata, headings, internal linking, schema, image alts, page speed SEO factors, and 6–10 prioritized, specific fixes with example snippets of improved titles/descriptions. Keep paragraphs concise and use <ul><li> for checklists.",
      ux:
        "You are a senior product designer. Return strictly semantic HTML for <section data-part=uiux> with <h2>UI/UX</h2> covering hierarchy, readability, layout, visual design, motion, accessibility heuristics, and mobile. Include concrete improvements tied to observed snippet details.",
      tech:
        "You are a principal full‑stack architect. Return strictly semantic HTML for <section data-part=tech> with <h2>Platform & Tech Stack</h2> inferred technologies, risks, security considerations, CMS/e‑commerce notes, and recommended upgrades with benefits.",
      performance:
        "You are a web performance engineer. Return strictly semantic HTML for <section data-part=perf> with <h2>Technical Performance</h2> focusing on Core Web Vitals hypotheses, render blocking, bundling, images/fonts, caching/CDN. Provide a prioritized remediation plan with estimated impact.",
      composer:
        "You are a communications lead. Given separate HTML fragments for SEO, UI/UX, Platform & Tech Stack, and Technical Performance, compose a single cohesive, branded audit article. Return strictly semantic HTML only: wrap in <article> with sections in this order: Overview (short), UI/UX, SEO, Technical Performance, Platform & Tech Stack, High‑Impact Recommendations (aggregate top 6–10 actions with expected impact and difficulty). Do not duplicate content; keep it crisp and readable.",
    } as const;

    const streamHint = request.headers.get("x-stream");
    const preferredModel = process.env.OPENAI_MODEL;
    const fallbackModel = process.env.OPENAI_FALLBACK_MODEL;
    const modelInUse: string = (preferredModel || fallbackModel || "gpt-4o-mini") as string;

    async function chat(model: string, systemPrompt: string, user: string) {
      const controller = new AbortController();
      const timeoutMs = Number(process.env.OPENAI_TIMEOUT_MS || 20000);
      const to = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "User-Agent": "AntimatterAI-SiteAudit/1.0",
          },
          body: JSON.stringify({ model, temperature: 0.3, messages: [{ role: "system", content: systemPrompt }, { role: "user", content: user }] }),
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}: ${await r.text()}`);
        const data = await r.json();
        return String(data?.choices?.[0]?.message?.content || "");
      } finally {
        clearTimeout(to);
      }
    }

    // Run domain prompts in parallel using the selected model
    const [seoHtml, uxHtml, techHtml, perfHtml] = await Promise.all([
      chat(modelInUse, prompts.seo, sharedContext),
      chat(modelInUse, prompts.ux, sharedContext),
      chat(modelInUse, prompts.tech, sharedContext),
      chat(modelInUse, prompts.performance, sharedContext),
    ]);

    // Compose final article
    let composed = "";
    try {
      composed = await chat(
        modelInUse,
        prompts.composer,
        `Fragments:\n\n[SEO]\n${seoHtml}\n\n[UIUX]\n${uxHtml}\n\n[TECH]\n${techHtml}\n\n[PERF]\n${perfHtml}`
      );
    } catch {
      // Fallback: quick stitched HTML if composer times out, to avoid request timeout
      composed = `<article>${uxHtml}${seoHtml}${perfHtml}${techHtml}</article>`;
    }

    // Ensure result is wrapped for downstream consumers
    const resultHtml = composed?.includes("<article") ? composed : `<article>${composed}</article>`;

    if (streamHint) {
      // Simple chunked streaming of HTML as it's composed; here we just stream the final HTML for simplicity
      const encoder = new TextEncoder();
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(encoder.encode(resultHtml));
          controller.close();
        },
      });
      return new Response(stream, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
      });
    }

    return NextResponse.json({ result: resultHtml, parts: { seo: seoHtml, uiux: uxHtml, tech: techHtml, performance: perfHtml } });
  } catch (e) {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}


