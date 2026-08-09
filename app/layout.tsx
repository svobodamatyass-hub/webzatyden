import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./seo";
import { getCspNonce } from "./security";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tvorba webu za týden | webzatyden",
    template: `%s | ${SITE_NAME}`,
  },
  description: "Profesionální firemní web na míru do sedmi pracovních dní.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "64x64" }],
    shortcut: "/icon",
    apple: "/icon",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#111210" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = await getCspNonce();
  const bootstrapScript = `try{document.documentElement.lang=location.pathname.startsWith('/en')?'en':'cs';const saved=localStorage.getItem('wzt-theme');const system=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=saved==='dark'||saved==='light'?saved:system}catch{document.documentElement.dataset.theme='light'}`;

  return (
    <html lang="cs" suppressHydrationWarning>
      <head><script nonce={nonce} dangerouslySetInnerHTML={{ __html: bootstrapScript }} /></head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
