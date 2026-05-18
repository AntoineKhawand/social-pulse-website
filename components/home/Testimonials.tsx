"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const testimonials = [
  {
    quote:
      "Social Pulse completely transformed our online presence. Within three months our reach tripled and we started getting inquiries from customers we never reached before.",
    author: "Lara K.",
    title: "Founder, Gold Luxe Jewellery",
    initials: "LK",
    color: "#D4AF37",
  },
  {
    quote:
      "The website they built for us is exactly what we envisioned — professional, fast, and it actually converts visitors into clients. Best investment we've made.",
    author: "Rami A.",
    title: "Director, Apex Financial Group",
    initials: "RA",
    color: "#0EA5E9",
  },
  {
    quote:
      "Our clinic's social media was stagnant. After working with Social Pulse, we gained 18,000 new followers in six months and our appointment bookings increased by 60%.",
    author: "Dr. Nadia S.",
    title: "Aesthetic Physician",
    initials: "NS",
    color: "#EC4899",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-32 bg-dark-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-light mb-4">Client voices</p>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-white leading-none">
            <SplitText text="What they say" />
          </h2>
        </div>

        {/* Testimonial display */}
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Quote mark */}
                <div className="text-6xl text-brand-light/30 font-display leading-none mb-4">"</div>
                <p className="text-white text-xl md:text-2xl leading-relaxed font-light max-w-2xl">
                  {testimonials[active].quote}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-dark"
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

          {/* Controls */}
          <div className="flex md:flex-col gap-3 md:gap-2 items-center md:items-end pt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative h-px md:h-auto md:w-px"
                aria-label={`Testimonial ${i + 1}`}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    backgroundColor: active === i ? "#7C3AED" : "#2d2d2d",
                    width: active === i ? 32 : 8,
                    height: active === i ? 8 : 8,
                  }}
                  style={{ display: "inline-block" }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex gap-3 mt-10">
          <button
            onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
            className="w-12 h-12 rounded-full border border-dark-300 hover:border-brand text-white flex items-center justify-center transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => setActive((a) => (a + 1) % testimonials.length)}
            className="w-12 h-12 rounded-full border border-dark-300 hover:border-brand text-white flex items-center justify-center transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
