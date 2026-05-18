import Hero from "@/components/home/Hero";
import ClientLogos from "@/components/home/ClientLogos";
import Marquee from "@/components/home/Marquee";
import FeaturedWork from "@/components/home/FeaturedWork";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Marquee />
      <FeaturedWork />
      <Stats />
      <Marquee reverse accent speed={25} className="border-dark-300" />
      <Services />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
