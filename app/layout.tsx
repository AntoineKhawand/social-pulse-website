import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.socialpulselb.com"),
  title: {
    default: "Social Pulse — Creative Agency Beirut & GCC | Branding, Social Media, Video",
    template: "%s | Social Pulse Lebanon",
  },
  description:
    "Social Pulse is a full-service creative agency in Beirut, Lebanon. We specialize in branding, social media management, video production, web design, and photography for brands across Lebanon and the GCC. The Heartbeat of Your Brand.",
  keywords: [
    "creative agency beirut",
    "social media agency lebanon",
    "branding agency beirut",
    "video production lebanon",
    "web design beirut",
    "digital marketing GCC",
    "social media management lebanon",
    "content creation beirut",
    "motion graphics lebanon",
    "photography agency beirut",
    "social pulse",
    "socialpulse.lb",
    "وكالة إبداعية بيروت",
    "تسويق رقمي لبنان",
    "إدارة وسائل التواصل الاجتماعي",
  ],
  authors: [{ name: "Social Pulse", url: "https://www.socialpulselb.com" }],
  creator: "Social Pulse Lebanon",
  publisher: "Social Pulse Lebanon",
  category: "Creative Agency",
  openGraph: {
    type: "website",
    url: "https://www.socialpulselb.com",
    title: "Social Pulse — Creative Agency Beirut & GCC",
    description:
      "Full-service creative agency in Beirut: branding, social media, video, and web design for brands across Lebanon and the GCC. The Heartbeat of Your Brand.",
    siteName: "Social Pulse",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Social Pulse — Creative Agency Beirut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Pulse — Creative Agency Beirut & GCC",
    description: "The Heartbeat of Your Brand. Branding, social media, video & web design in Lebanon.",
    images: ["/og-image.jpg"],
    creator: "@socialpulselb",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.socialpulselb.com",
    languages: {
      "en-US": "https://www.socialpulselb.com",
      "ar-LB": "https://www.socialpulselb.com/ar",
    },
  },
  verification: {
    google: "your-google-search-console-token-here",
  },
  other: {
    // GEO meta tags for geographic SEO
    "geo.region": "LB-BA",
    "geo.placename": "Beirut, Lebanon",
    "geo.position": "33.8938;35.5018",
    ICBM: "33.8938, 35.5018",
    // AEO — Speakable and entity hints
    "theme-color": "#7C3AED",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd />
      </head>
      <body className="bg-dark text-white antialiased noise">
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
