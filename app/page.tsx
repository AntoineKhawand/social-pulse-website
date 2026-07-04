import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ClientLogos from "@/components/home/ClientLogos";
import FeaturedWork from "@/components/home/FeaturedWork";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Social Pulse — Creative Agency Beirut & GCC | Branding, Social Media, Video",
  },
  description:
    "Social Pulse is a full-service creative agency in Beirut, Lebanon. We specialize in branding, social media management, video production, web design, and photography for brands across Lebanon and the GCC. The Heartbeat of Your Brand.",
  alternates: { canonical: "https://www.socialpulselb.com" },
  openGraph: {
    title: "Social Pulse — Creative Agency Beirut & GCC",
    description:
      "Full-service creative agency in Beirut: branding, social media, video, and web design for brands across Lebanon and the GCC. The Heartbeat of Your Brand.",
    url: "https://www.socialpulselb.com",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <FeaturedWork />
      <Stats />
      <Services />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
