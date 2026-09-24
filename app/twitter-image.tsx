import { ImageResponse } from "next/og";

export const alt = "Sauna Whisks — Sauna ritual knowledge from Latvia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#203629",
          color: "#f1eee5",
          padding: "70px 78px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, letterSpacing: "0.18em" }}>
            LATVIA · SAUNA RITUAL KNOWLEDGE
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 108,
                lineHeight: 0.88,
                letterSpacing: "-0.045em",
              }}
            >
              <div style={{ display: "flex" }}>The forest belongs</div>
              <div style={{ display: "flex" }}>in the sauna.</div>
            </div>

            <div style={{ display: "flex", fontSize: 30, marginTop: 38, opacity: 0.78 }}>
              SAUNA WHISKS
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: -80,
            top: -70,
            width: 480,
            height: 480,
            borderRadius: 480,
            border: "2px solid rgba(241,238,229,.25)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: 85,
            bottom: -170,
            width: 390,
            height: 390,
            borderRadius: 390,
            border: "2px solid rgba(241,238,229,.18)",
            display: "flex",
          }}
        />
      </div>
    ),
    size
  );
}
