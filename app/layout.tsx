import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "webzatyden.cz";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: "webzatyden — Váš nový web. Za týden online.",
    description: "Profesionální firemní web s jasnou cenou a hotovým výsledkem do 7 pracovních dní.",
    openGraph: {
      title: "Váš nový web. Za týden online.",
      description: "Texty, design i techniku vyřešíme za vás. Jasně, rychle a bez chaosu.",
      locale: "cs_CZ",
      type: "website",
      images: [{ url: socialImage, width: 1729, height: 910, alt: "webzatyden — Váš nový web. Za týden online." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Váš nový web. Za týden online.",
      description: "Profesionální web do 7 pracovních dní, s jasnou cenou a bez chaosu.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `try{const saved=localStorage.getItem('wzt-theme');const system=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=saved==='dark'||saved==='light'?saved:system}catch{document.documentElement.dataset.theme='light'}`;

  return (
    <html lang="cs" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
