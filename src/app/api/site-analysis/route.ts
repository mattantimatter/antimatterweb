import { NextResponse } from "next/server";

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

    const messages = [
      {
        role: "system",
        content:
          "You are a principal web architect at Antimatter AI. Analyze a public website and produce a personalized, prioritized audit for a business stakeholder. Return strictly semantic HTML (no markdown, no code fences). Use <h2>, <h3>, <p>, <ul>, <li>, and <strong> tags with generous spacing and readable structure. The report must include these sections, in order:\n\n<h2>Overview</h2> (business/UX intent and who the site serves)\n<h2>UI/UX Improvements</h2> (layout, hierarchy, visual design, readability, mobile, motion)\n<h2>Navigation & IA</h2> (menu clarity, information architecture, findability, internal linking)\n<h2>Conversion Optimization</h2> (value propositions, social proof, CTAs, forms, friction removals, experiment ideas)\n<h2>Technical Performance</h2> (Core Web Vitals hypotheses, render path, images/fonts, caching/CDN)\n<h2>Accessibility</h2> (color contrast, focus states, semantics, keyboard, ARIA)\n<h2>Platform & Tech Stack</h2> (inferred stack, risks, recommended upgrades)\n<h2>High‑Impact Recommendations</h2> (ordered list of 5–8 specific actions with expected impact)\n\nBe concrete with examples drawn from the snippet. Use short paragraphs and bulleted lists.",
      },
      {
        role: "user",
        content: `Audience Industry: ${industry || "(unspecified)"}
Requester: ${name || "(unspecified)"}${title ? ", " + title : ""}
Target URL: ${normalized}

Fetch Meta: first_byte_ms≈${fetchMs}, headers=${JSON.stringify(headers)}
Website HTML snippet (truncated):\n${snippet}`,
      },
    ];

    // Prefer configured model; attempt GPT‑5 if available, with graceful fallback.
    const preferredModel = process.env.OPENAI_MODEL || "gpt-5"; // if unavailable, we fallback below
    const fallbackModel = process.env.OPENAI_FALLBACK_MODEL || "gpt-4o-mini";

    async function callOpenAI(model: string) {
      return fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
      }),
      });
    }

    let resp = await callOpenAI(preferredModel);
    if (!resp.ok) {
      // Retry once with fallback model
      resp = await callOpenAI(fallbackModel);
    }

    if (!resp.ok) {
      const err = await resp.text();
      return NextResponse.json({ error: "OpenAI error", details: err }, { status: 502 });
    }

    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content || "No response.";
    return NextResponse.json({ result: text });
  } catch (e) {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}


