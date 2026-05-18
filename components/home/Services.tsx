"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const services = [
  {
    id: "01",
    title: "Branding & Identity",
    description:
      "We craft brand systems with presence — from logo and visual identity to brand guidelines, tone of voice, and full rollout across every touchpoint. Built to be remembered.",
    deliverables: ["Logo design", "Brand guidelines", "Typography system", "Color palette", "Brand collateral"],
    icon: "◈",
  },
  {
    id: "02",
    title: "Social Media Management",
    description:
      "Strategy-first content creation and community management. We turn your social channels into growth engines — consistent, creative, and always aligned with your goals.",
    deliverables: ["Monthly content calendars", "Reel production", "Community management", "Paid social campaigns", "Analytics reporting"],
    icon: "◉",
  },
  {
    id: "03",
    title: "Video & Motion",
    description:
      "Cinematic brand films, product videos, animated explainers, and high-impact reels. Every frame is crafted to stop the scroll and start conversations.",
    deliverables: ["Brand films", "Reels & shorts", "Motion graphics", "After Effects animation", "Drone footage"],
    icon: "▶",
  },
  {
    id: "04",
    title: "Web Design & Development",
    description:
      "Conversion-focused websites with personality. We design and build custom sites that are fast, accessible, beautifully animated, and built to scale.",
    deliverables: ["UX/UI design", "Figma prototypes", "Next.js development", "CMS integration", "SEO setup"],
    icon: "⬡",
  },
  {
    id: "05",
    title: "Photography",
    description:
      "Editorial, product, event, and lifestyle photography that makes your brand's visual world undeniable. From studio setups to on-location shoots.",
    deliverables: ["Product photography", "Lifestyle shoots", "Event coverage", "Retouching", "Art direction"],
    icon: "◎",
  },
];

export default function Services() {
  const [active, setActive] = useState<string | null>("01");

  return (
    <section className="py-20 md:py-32 bg-dark-100">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-4">What we do</p>
          <h2 className="font-display font-bold text-5xl md:text-7xl text-white leading-none">
            <SplitText text="Services" />
          </h2>
        </div>

        {/* Accordion */}
        <div className="border-t border-dark-300">
          {services.map((service) => {
            const isOpen = active === service.id;

            return (
              <div key={service.id} className="border-b border-dark-300">
                <button
                  className="w-full flex items-center gap-3 md:gap-6 py-5 md:py-8 text-left group"
                  onClick={() => setActive(isOpen ? null : service.id)}
                >
                  <span className="text-neutral-mid text-xs md:text-sm font-mono w-6 md:w-8 shrink-0">
                    {service.id}
                  </span>
                  <span className="text-lg md:text-2xl text-brand-light w-6 md:w-8 shrink-0">
                    {service.icon}
                  </span>
                  <span
                    className={`font-display font-bold text-xl sm:text-2xl md:text-4xl transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-neutral-muted group-hover:text-white"
                    }`}
                  >
                    {service.title}
                  </span>
                  <motion.span
                    className="ml-auto text-neutral-muted text-xl md:text-2xl shrink-0"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      {/* On mobile: no left padding. On md+: indent to align with title text */}
                      <div className="pb-6 md:pb-8 md:pl-[88px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <p className="text-neutral-muted text-sm md:text-base leading-relaxed">
                          {service.description}
                        </p>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-neutral-mid mb-3 md:mb-4">
                            Deliverables
                          </p>
                          <ul className="flex flex-col gap-2">
                            {service.deliverables.map((d) => (
                              <li key={d} className="flex items-center gap-3 text-sm text-neutral-muted">
                                <span className="w-1 h-1 rounded-full bg-brand-light shrink-0" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
