import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://webzatyden.cz"),
  title: "webzatyden — Váš nový web. Za týden online.",
  description: "Profesionální firemní web s jasnou cenou a hotovým výsledkem do 7 pracovních dní.",
  openGraph: {
    title: "Váš nový web. Za týden online.",
    description: "Texty, design i techniku vyřešíme za vás. Jasně, rychle a bez chaosu.",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="cs"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
