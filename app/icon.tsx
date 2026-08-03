import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ background: "#f4f2ed", color: "#171816", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, border: "3px solid #171816", borderRadius: 14, position: "relative" }}>7<span style={{ position: "absolute", right: 5, bottom: 5, width: 8, height: 8, borderRadius: 8, background: "#cf5d3f" }} /></div>,
    { ...size }
  );
}
