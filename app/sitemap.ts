import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = {
    languages: {
      "cs-CZ": `${SITE_URL}/`,
      en: `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/`,
    },
  };

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates,
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates,
    },
  ];
}
