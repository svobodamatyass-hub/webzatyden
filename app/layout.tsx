import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://webzatyden.svobodamatyass.chatgpt.site"),
    alternates: { canonical: "/" },
    title: "webzatyden — Váš nový web. Za týden online.",
    description: "Profesionální firemní web s jasnou cenou a hotovým výsledkem do 7 pracovních dní.",
    openGraph: {
      title: "Váš nový web. Za týden online.",
      description: "Texty, design i techniku vyřešíme za vás. Jasně, rychle a bez chaosu.",
      locale: "cs_CZ",
      type: "website",
      images: [{ url: "/og.png", width: 1729, height: 910, alt: "webzatyden — Váš nový web. Za týden online." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Váš nový web. Za týden online.",
      description: "Profesionální web do 7 pracovních dní, s jasnou cenou a bez chaosu.",
      images: ["/og.png"],
    },
  };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `try{const saved=localStorage.getItem('wzt-theme');const system=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=saved==='dark'||saved==='light'?saved:system}catch{document.documentElement.dataset.theme='light'}`;

  return (
    <html lang="cs" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
