import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Antimatter AI — Digital Solutions That Matter";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "radial-gradient(1200px 600px at 50% 50%, #1f1b3a 0%, #0b0b12 70%)",
          color: "#ffffff",
          fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: "#6366f1",
              borderRadius: 16,
              boxShadow: "0 10px 40px rgba(99,102,241,0.5)",
            }}
          />
          <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1.5 }}>
            Antimatter AI
          </div>
        </div>
        <div style={{ marginTop: 24, fontSize: 36, opacity: 0.9 }}>
          Digital Solutions That Matter
        </div>
        <div style={{ marginTop: 16, fontSize: 24, color: "#a1a1aa" }}>
          antimatterai.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


