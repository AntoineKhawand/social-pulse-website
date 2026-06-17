import Hero from "@/components/home/Hero";
import ClientLogos from "@/components/home/ClientLogos";
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
      <FeaturedWork />
      <Stats />
      <Services />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
