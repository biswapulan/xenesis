import { ImageResponse } from "next/og";

export const alt = "XENESIS 4.0, coming soon";
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#eef3fb",
        }}
      >
        <div style={{ display: "flex", fontSize: 170, fontWeight: 900, letterSpacing: -4 }}>
          XENESIS 4.0
        </div>
        <div style={{ display: "flex", fontSize: 38, color: "#8fa6bd", letterSpacing: 8, marginTop: 12 }}>
          Coming soon
        </div>
      </div>
    ),
    size
  );
}
