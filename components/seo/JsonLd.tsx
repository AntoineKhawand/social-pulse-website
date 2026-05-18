/**
 * Injects JSON-LD structured data for SEO, GEO, and AEO.
 * Used on all pages for Organization and LocalBusiness signals.
 */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": "https://www.socialpulselb.com/#organization",
  name: "Social Pulse",
  alternateName: ["Social Pulse Lebanon", "Social Pulse LB"],
  url: "https://www.socialpulselb.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.socialpulselb.com/logo.png",
    width: 512,
    height: 512,
  },
  image: "https://www.socialpulselb.com/og-image.jpg",
  description:
    "Social Pulse is a full-service creative agency based in Beirut, Lebanon, specializing in branding, social media management, video production, web design, and photography for brands across Lebanon and the GCC.",
  slogan: "The Heartbeat of Your Brand",
  foundingDate: "2019",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Beirut",
    addressLocality: "Beirut",
    addressRegion: "Beirut Governorate",
    addressCountry: "LB",
    postalCode: "1100",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.8938,
    longitude: 35.5018,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Lebanon",
    },
    {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    {
      "@type": "Country",
      name: "Kuwait",
    },
    {
      "@type": "Country",
      name: "Qatar",
    },
    {
      "@type": "Country",
      name: "United States",
    },
    {
      "@type": "Country",
      name: "France",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "socialpulselb@gmail.com",
      availableLanguage: ["English", "Arabic", "French"],
    },
  ],
  sameAs: [
    "https://www.instagram.com/socialpulse.lb/",
    "https://www.linkedin.com/company/socialpulselb",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Creative Agency Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Branding & Identity Design",
          description: "Logo design, brand guidelines, typography, and visual identity for businesses in Lebanon and the GCC.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Social Media Management",
          description: "Content strategy, content creation, community management, and paid social campaigns for Instagram, Facebook, and TikTok.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Video Production & Motion Graphics",
          description: "Brand films, reels, product videos, After Effects animations, and cinematic content creation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Design & Development",
          description: "Custom website design and development using Next.js, with SEO optimization and CMS integration.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Photography",
          description: "Product, lifestyle, event, and editorial photography for brands across Beirut and the GCC.",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.socialpulselb.com/#website",
  url: "https://www.socialpulselb.com",
  name: "Social Pulse — Creative Agency Beirut",
  publisher: { "@id": "https://www.socialpulselb.com/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.socialpulselb.com/work?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
