import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

// Ensure this runs on the Node.js runtime in Vercel/Next
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  // Generate a branded PDF from provided HTML content
  try {
    const body = await request.json().catch(() => ({}));
    const { html, title } = body as { html?: string; title?: string };
    if (!html) {
      return NextResponse.json({ error: "Missing html" }, { status: 400 });
    }

    // Inline logo as data URL for reliable rendering in headless Chromium
    let logoDataUrl = "";
    try {
      const logoPath = path.join(process.cwd(), "public", "images", "AnitimatterAI-Logo.png");
      const buf = fs.readFileSync(logoPath);
      logoDataUrl = `data:image/png;base64,${buf.toString("base64")}`;
    } catch {
      // ignore if logo missing; continue without
    }

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: "new",
    } as any);

    try {
      const page = await browser.newPage();
      const documentHtml = `<!doctype html><html><head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          @page { margin: 16mm; }
          :root { --ink:#0B0B12; --muted:#6B7280; --border:#E5E7EB; }
          body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Inter, Helvetica, Arial, sans-serif; color: var(--ink); }
          .header { display:flex; align-items:center; justify-content:space-between; margin-bottom: 12mm; }
          .brand { display:flex; align-items:center; gap:8px; }
          .brand img { height: 22px; }
          .badge { font-size: 10px; color: var(--muted); }
          .cover { margin: 0 0 10mm 0; padding: 14mm; border: 1px solid var(--border); border-radius: 12px; background: radial-gradient(100% 140% at 0% 0%, #EEF2FF 0%, #F5F3FF 50%, #FFFFFF 100%); }
          h1 { margin: 0 0 4mm 0; font-size: 22px; }
          h2, h3 { color: var(--ink); }
          article { line-height: 1.55; }
          ul { margin: 0 0 4mm 5mm; }
          li { margin: 1.5mm 0; }
        </style>
      </head><body>
        <div class="header">
          <div class="brand">
            ${logoDataUrl ? `<img src="${logoDataUrl}" alt="Antimatter AI" />` : `<strong>Antimatter AI</strong>`}
          </div>
          <div class="badge">antimatterai.com</div>
        </div>
        <div class="cover">
          <h1>${title || "Website Audit"}</h1>
          <div class="badge">Automated analysis with expert prompts across UI/UX, SEO, performance, and platform.</div>
        </div>
        <main>${html}</main>
      </body></html>`;

      await page.setContent(documentHtml, { waitUntil: "networkidle0" });
      const pdfArrayBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: "16mm", bottom: "16mm", left: "16mm", right: "16mm" },
      });
      await page.close();
      await browser.close();

      const ab = pdfArrayBuffer.buffer.slice(
        pdfArrayBuffer.byteOffset,
        pdfArrayBuffer.byteOffset + pdfArrayBuffer.byteLength
      );

      return new Response(ab, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=Antimatter-Website-Audit.pdf",
          "Cache-Control": "no-store",
        },
      });
    } catch (e: any) {
      await browser.close();
      throw e;
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "PDF error" }, { status: 500 });
  }
}


