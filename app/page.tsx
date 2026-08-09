import type { Metadata } from "next";
import HomeClient from "./home-client";
import { createPageMetadata, createStructuredData } from "./seo";

export const metadata: Metadata = createPageMetadata("cs");

export default function Home() {
  const structuredData = createStructuredData("cs");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <HomeClient lang="cs" />
    </>
  );
}
