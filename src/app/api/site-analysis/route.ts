import { NextResponse } from "next/server";

async function fetchHtmlSnippet(url: string): Promise<string> {
  try {
    const resp = await fetch(url, {
      headers: { "User-Agent": "AntimatterAI-SiteAudit/1.0" },
      cache: "no-store",
    });
    if (!resp.ok) return "";
    const html = await resp.text();
    return html.replace(/\s+/g, " ").slice(0, 8000);
  } catch {
    return "";
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

    const snippet = await fetchHtmlSnippet(normalized);

    const messages = [
      {
        role: "system",
        content:
          "You are a senior web architect at Antimatter AI. Analyze a public website and produce a concise, prioritized audit. Return strictly semantic HTML (no markdown, no code fences). Use h2/h3, p, ul/li, and strong tags. Sections: <h2>Overview</h2> (business/UX intent), <h2>UI/UX</h2>, <h2>SEO</h2>, <h2>Technical Performance</h2>, <h2>Platform & Architecture</h2>, and <h2>High‑Impact Recommendations</h2> (ordered list). Be concrete with examples and rationale. Keep to ~300–600 words total.",
      },
      {
        role: "user",
        content: `Audience Industry: ${industry || "(unspecified)"}
Requester: ${name || "(unspecified)"}${title ? ", " + title : ""}
Target URL: ${normalized}

Website HTML snippet (truncated):\n${snippet}`,
      },
    ];

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.3,
      }),
    });

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


