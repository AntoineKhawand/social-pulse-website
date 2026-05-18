import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: {
    default: "Social Pulse — Creative Agency Beirut & GCC",
    template: "%s | Social Pulse",
  },
  description:
    "Social Pulse is a full-service creative agency in Beirut. Branding, social media management, video production, and web design for brands across Lebanon and the GCC.",
  keywords: [
    "creative agency beirut",
    "social media management lebanon",
    "branding agency",
    "video production beirut",
    "web design lebanon",
    "digital marketing GCC",
    "social pulse",
  ],
  openGraph: {
    type: "website",
    url: "https://www.socialpulselb.com",
    title: "Social Pulse — Creative Agency Beirut & GCC",
    description: "The Heartbeat of Your Brand.",
    siteName: "Social Pulse",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Pulse — Creative Agency",
    description: "The Heartbeat of Your Brand.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-dark text-white antialiased noise">
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
