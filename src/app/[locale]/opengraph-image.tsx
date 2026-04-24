import { ImageResponse } from "next/og";

export const alt = "Alan Faerverguer — Full-stack software developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F3EDDF",
          color: "#1A2333",
          padding: "72px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6B6357",
            borderBottom: "1px solid rgba(26, 35, 51, 0.18)",
            paddingBottom: 16,
          }}
        >
          <span style={{ display: "flex" }}>Dossier · 2026</span>
          <span style={{ display: "flex" }}>§ Portfolio</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
          <div
            style={{
              fontSize: 280,
              fontStyle: "italic",
              color: "#C8331F",
              fontWeight: 700,
              lineHeight: 0.85,
              letterSpacing: -10,
              display: "flex",
            }}
          >
            AF
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 84,
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: -2,
                display: "flex",
              }}
            >
              Alan
            </div>
            <div
              style={{
                fontSize: 84,
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: -2,
                display: "flex",
              }}
            >
              Faerverguer
            </div>
            <div
              style={{
                fontSize: 30,
                fontStyle: "italic",
                color: "#2E3646",
                marginTop: 16,
                display: "flex",
              }}
            >
              Full-stack software developer
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6B6357",
            borderTop: "1px solid rgba(26, 35, 51, 0.18)",
            paddingTop: 16,
          }}
        >
          <span style={{ display: "flex" }}>faeralan.dev</span>
          <span style={{ display: "flex" }}>TypeScript · .NET · React · Next.js</span>
        </div>
      </div>
    ),
    size,
  );
}
