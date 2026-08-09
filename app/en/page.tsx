import type { Metadata } from "next";
import HomeClient from "../home-client";
import { createPageMetadata, createStructuredData } from "../seo";

export const metadata: Metadata = createPageMetadata("en");

export default function EnglishHome() {
  const structuredData = createStructuredData("en");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <HomeClient lang="en" />
    </>
  );
}
