"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[20%] left-[5%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[5%] w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(196,181,253,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pt-28 md:pt-36 pb-20"
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-8 md:mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <span className="w-6 md:w-8 h-px bg-brand-light shrink-0" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-brand-light font-medium">
            Beirut · GCC · Global
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="mb-6 overflow-hidden">
          <motion.h1
            className="font-display font-bold text-[clamp(2.8rem,10vw,9rem)] leading-[0.9] tracking-tight text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
              >
                The Heartbeat
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-gradient"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              >
                of Your Brand.
              </motion.span>
            </span>
          </motion.h1>
        </div>

        {/* Subtext + CTA */}
        <div className="flex flex-col gap-8 md:gap-10 mt-10 md:mt-12">
          <motion.p
            className="text-neutral-muted text-base md:text-xl max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
          >
            Social Pulse is a full-service creative agency in Beirut — branding, social media,
            video production, and web design — built to make brands impossible to ignore across
            Lebanon and the GCC.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          >
            <Link
              href="/work"
              className="text-center px-7 py-4 rounded-full bg-brand text-white font-medium text-sm hover:bg-brand-dark hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all duration-300"
              data-cursor-label="View"
            >
              See our work
            </Link>
            <Link
              href="/contact"
              className="text-center px-7 py-4 rounded-full border border-dark-400 text-white font-medium text-sm hover:border-brand-light transition-all duration-300"
            >
              Start a project →
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-neutral-mid">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-brand-light to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
