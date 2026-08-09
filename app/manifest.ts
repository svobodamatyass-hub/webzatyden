import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "webzatyden — profesionální web za týden",
    short_name: "webzatyden",
    description: "Profesionální firemní web na míru do sedmi pracovních dní.",
    start_url: "/",
    display: "standalone",
    background_color: "#111210",
    theme_color: "#f28f70",
    lang: "cs",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
