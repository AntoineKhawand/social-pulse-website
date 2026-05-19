"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const testimonials = [
  {
    quote:
      "Social Pulse rebuilt our entire content strategy. Our engagement went from 0.8% to 4.2% and we started receiving qualified inquiry DMs daily. The transformation was remarkable.",
    author: "Retail Brand Owner",
    title: "Fashion & Lifestyle, Beirut",
    initials: "RB",
    color: "#7C3AED",
  },
  {
    quote:
      "Within 60 days of working with Social Pulse, our clinic saw a 140% increase in appointment bookings driven purely through Instagram. Their healthcare content expertise is unmatched.",
    author: "Medical Clinic Director",
    title: "Aesthetic Medicine, Beirut",
    initials: "MC",
    color: "#EC4899",
  },
  {
    quote:
      "They rebuilt our brand from the ground up. Logo, color palette, and social strategy, all redesigned. We now have 40% higher engagement and a steady stream of reservation requests every week.",
    author: "Restaurant Founder",
    title: "F&B, Beirut",
    initials: "RF",
    color: "#F59E0B",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 md:py-32 bg-dark-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-4">Client voices</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-none">
            <SplitText text="What they say" />
          </h2>
        </div>

        {/* Testimonial display */}
        <div className="relative min-h-[280px] sm:min-h-[240px] mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-5xl md:text-6xl text-brand-light/30 font-display leading-none mb-4">
                &ldquo;
              </div>
              <p className="text-white text-lg sm:text-xl md:text-2xl leading-relaxed font-light max-w-3xl">
                {testimonials[active].quote}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-dark shrink-0"
                  style={{ backgroundColor: testimonials[active].color }}
                >
                  {testimonials[active].initials}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{testimonials[active].author}</p>
                  <p className="text-neutral-muted text-xs">{testimonials[active].title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-dark-300 hover:border-brand text-white flex items-center justify-center transition-colors text-sm"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            onClick={() => setActive((a) => (a + 1) % testimonials.length)}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-dark-300 hover:border-brand text-white flex items-center justify-center transition-colors text-sm"
            aria-label="Next testimonial"
          >
            →
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2 ml-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    backgroundColor: active === i ? "#7C3AED" : "#2d2d2d",
                    width: active === i ? 28 : 8,
                    height: 8,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
