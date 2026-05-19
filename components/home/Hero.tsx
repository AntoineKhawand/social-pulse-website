"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// ─── Swap this ID to change the background video ──────────────────────────────
// Video only plays on desktop. Mobile shows gradient background (iOS blocks iframe autoplay).
const YOUTUBE_VIDEO_ID = "1xYXW0RU7Do";
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark"
    >
      {/* ── YouTube video — desktop only (iOS blocks iframe autoplay) ─────── */}
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <iframe
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            minWidth: "177.78vh",
            transform: "translate(-50%, -50%)",
            border: "none",
          }}
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=3`}
          allow="autoplay; encrypted-media; picture-in-picture"
          title="Agency showreel background"
        />
      </div>

      {/* ── Mobile gradient background (shown when iframe is hidden) ─────── */}
      <div className="md:hidden absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[10%] left-[-10%] w-[70vw] h-[70vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(196,181,253,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Shared overlay ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-dark/75" />
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-dark to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-dark/60 to-transparent" />
        {/* Brand purple glow */}
        <div
          className="absolute top-[20%] left-[5%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-20"
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <span className="w-5 sm:w-6 md:w-8 h-px bg-brand-light shrink-0" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-brand-light font-medium">
            Lebanon · KSA · UAE · USA
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="mb-4 sm:mb-6 overflow-hidden">
          <motion.h1
            className="font-display font-bold text-[clamp(2.6rem,10vw,9rem)] leading-[0.9] tracking-tight text-white"
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

        {/* Subtext + CTAs */}
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 mt-8 md:mt-12">
          <motion.p
            className="text-neutral-muted text-sm sm:text-base md:text-xl max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
          >
            Social Pulse is a full-service creative agency in Beirut. Branding, social media,
            video production, and web design built to make brands impossible to ignore across
            Lebanon and the GCC.
          </motion.p>

          <motion.div
            className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          >
            <Link
              href="/work"
              className="text-center px-7 py-4 rounded-full bg-brand text-white font-medium text-sm hover:bg-brand-dark hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] active:scale-95 transition-all duration-300"
              data-cursor-label="View"
            >
              See our work
            </Link>
            <Link
              href="/contact"
              className="text-center px-7 py-4 rounded-full border border-dark-400 text-white font-medium text-sm hover:border-brand-light active:scale-95 transition-all duration-300"
            >
              Start a project →
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint — desktop only */}
        <motion.div
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-neutral-mid/70">Scroll</span>
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
