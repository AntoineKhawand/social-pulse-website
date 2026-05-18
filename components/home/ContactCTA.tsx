"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <section ref={ref} className="py-12 md:py-24 bg-dark px-5 sm:px-8 md:px-10 lg:px-16">
      <motion.div
        style={{ scale }}
        className="max-w-[1440px] mx-auto rounded-2xl md:rounded-3xl bg-brand relative overflow-hidden"
      >
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand to-violet-400 opacity-80" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)",
          }}
        />

        <div className="relative z-10 py-14 md:py-28 px-6 sm:px-10 md:px-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
          <div>
            <p className="text-violet-200 text-xs md:text-sm uppercase tracking-widest mb-4">
              Let&apos;s talk
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl text-white leading-tight max-w-xl">
              Ready to make your brand pulse?
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            <Link
              href="/contact"
              className="px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-white text-brand font-bold text-sm hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105"
            >
              Start a project
            </Link>
            <a
              href="https://www.instagram.com/socialpulse.lb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-200 text-sm hover:text-white transition-colors"
            >
              Or find us @socialpulse.lb →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
