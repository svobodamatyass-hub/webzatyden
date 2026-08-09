import type { Metadata } from "next";
import HomeClient from "../home-client";
import { createPageMetadata, createStructuredData } from "../seo";
import { getCspNonce } from "../security";

export const metadata: Metadata = createPageMetadata("en");

export default async function EnglishHome() {
  const structuredData = createStructuredData("en");
  const nonce = await getCspNonce();

  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <HomeClient lang="en" />
    </>
  );
}
