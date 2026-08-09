import type { Metadata } from "next";
import type { Lang } from "./home-client";

export const SITE_URL = "https://webzatyden.pages.dev";
export const SITE_NAME = "webzatyden";

const seoCopy = {
  cs: {
    path: "/",
    locale: "cs_CZ",
    title: "Tvorba webu za týden",
    description: "Profesionální firemní web na míru do 7 pracovních dní. Struktura, texty, design, mobilní verze, formulář a spuštění za pevnou cenu.",
    keywords: ["tvorba webu", "web za týden", "webové stránky na míru", "firemní web", "tvorba webových stránek", "webdesign Praha"],
    serviceName: "Profesionální web za týden",
    serviceDescription: "Návrh struktury, úprava textů, individuální design, vývoj a spuštění firemního webu do sedmi pracovních dní.",
    area: "Česká republika",
  },
  en: {
    path: "/en",
    locale: "en_US",
    title: "Professional website in one week",
    description: "A custom business website delivered in 7 working days. Strategy, copy, design, mobile optimisation, contact form and launch for a fixed price.",
    keywords: ["website in one week", "custom business website", "web design Czech Republic", "small business website", "fixed price website"],
    serviceName: "Professional website in one week",
    serviceDescription: "Website structure, refined copy, custom design, development and launch delivered within seven working days.",
    area: "Czech Republic",
  },
} as const;

export function createPageMetadata(lang: Lang): Metadata {
  const page = seoCopy[lang];
  const canonical = `${SITE_URL}${page.path}`;
  const socialTitle = `${page.title} | ${SITE_NAME}`;

  return {
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: `${SITE_URL}/` }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Web design and development",
    alternates: {
      canonical,
      languages: {
        "cs-CZ": `${SITE_URL}/`,
        "en": `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      locale: page.locale,
      alternateLocale: [lang === "cs" ? "en_US" : "cs_CZ"],
      title: socialTitle,
      description: page.description,
      images: [{
        url: `${SITE_URL}/og.png`,
        width: 1729,
        height: 910,
        alt: lang === "cs" ? "webzatyden — profesionální web za týden" : "webzatyden — a professional website in one week",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.description,
      images: [`${SITE_URL}/og.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

const faqs = {
  cs: [
    ["Může být kvalitní web hotový za týden?", "Ano, pokud jde o jasně vymezený prezentační web a připomínky schvaluje jeden člověk. Rychlost stojí na systému, ne na zkratkách."],
    ["Co když nemám texty ani fotografie?", "Z vašich odpovědí připravíme strukturu, texty upravíme a doporučíme vhodný obrazový směr."],
    ["Kolik úprav je v ceně?", "Dvě soustředěná kola v domluvených bodech procesu. Změna schváleného zadání se řeší zvlášť."],
    ["Budu web opravdu vlastnit?", "Po doplacení vám předáme web a všechny přístupy zahrnuté v dohodnutém rozsahu. Způsob správy domény a hostingu si potvrdíme před zahájením."],
  ],
  en: [
    ["Can a quality website be ready in a week?", "Yes, when the presentation site has a clear scope and one person approves feedback. Speed comes from the system, not shortcuts."],
    ["What if I have no copy or photos?", "We shape the structure from your answers, refine the copy and recommend a suitable visual direction."],
    ["How many revisions are included?", "Two focused rounds at agreed milestones. Changes to an approved brief are handled separately."],
    ["Will I actually own the website?", "After final payment, we hand over the website and every access credential included in the agreed scope. Domain and hosting management are confirmed before work begins."],
  ],
} as const;

export function createStructuredData(lang: Lang) {
  const page = seoCopy[lang];
  const pageUrl = `${SITE_URL}${page.path}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: ["cs-CZ", "en"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      email: "poptavka@webzatyden.cz",
      image: `${SITE_URL}/og.png`,
      areaServed: page.area,
      knowsLanguage: ["cs", "en"],
      makesOffer: {
        "@type": "OfferCatalog",
        name: page.serviceName,
        itemListElement: [
          { "@type": "Offer", name: "Start", price: "3000", priceCurrency: "CZK" },
          { "@type": "Offer", name: lang === "cs" ? "Web za týden" : "Website in a week", price: "5000", priceCurrency: "CZK" },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: page.serviceName,
      description: page.serviceDescription,
      url: pageUrl,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: page.area,
      serviceType: "Web design and development",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs[lang].map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];
}
