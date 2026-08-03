import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ background: "#ff5c35", color: "#101820", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, fontWeight: 900, borderRadius: 14 }}>7</div>,
    { ...size }
  );
}
