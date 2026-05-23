"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { PageScreenshot } from "@/lib/projects";

interface BrowserMockupProps {
  url: string;
  title: string;
  screenshots: PageScreenshot[];
  accentColor: string;
  techStack?: string[];
  features?: string[];
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 56 : -56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -56 : 56, opacity: 0 }),
};

const BADGES = [
  { icon: "⚡", label: "Performance-first" },
  { icon: "📱", label: "Mobile-first" },
  { icon: "🔍", label: "SEO Ready" },
];

export default function BrowserMockup({
  url,
  title,
  screenshots,
  accentColor,
  techStack = [],
  features = [],
}: BrowserMockupProps) {
  const [activePage, setActivePage]   = useState(0);
  const [prevPage,   setPrevPage]     = useState(0);
  const [view,       setView]         = useState<"desktop" | "mobile">("desktop");
  const [isHovered,  setIsHovered]    = useState(false);
  const scrollControls = useAnimation();

  const hasScreenshots = screenshots.length > 0;
  const current        = hasScreenshots ? screenshots[activePage] : null;
  const domain         = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const direction      = activePage >= prevPage ? 1 : -1;

  // ── Auto-scroll ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!hasScreenshots || isHovered || view === "mobile") {
      scrollControls.stop();
      return;
    }
    scrollControls.start({
      y: ["0%", "-42%", "-42%", "0%"],
      transition: {
        duration: 16,
        times: [0, 0.42, 0.58, 1],
        repeat: Infinity,
        ease: [0.45, 0, 0.55, 1],
      },
    });
    return () => { scrollControls.stop(); };
  }, [isHovered, view, activePage, hasScreenshots, scrollControls]);

  const handlePageChange = (i: number) => {
    if (i === activePage) return;
    setPrevPage(activePage);
    setActivePage(i);
    setView("desktop");
  };

  return (
    <div className="w-full">

      {/* ── Browser window ──────────────────────────────────────────────────── */}
      <motion.div
        className="rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${accentColor}25` }}
        animate={{
          boxShadow: isHovered
            ? `0 0 0 1px ${accentColor}35, 0 40px 100px rgba(0,0,0,0.65), 0 0 80px ${accentColor}28`
            : `0 0 0 1px ${accentColor}15, 0 24px 64px rgba(0,0,0,0.45), 0 0 40px ${accentColor}12`,
        }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Chrome bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ background: "rgba(10,10,12,0.98)", borderColor: `${accentColor}18` }}
        >
          <div className="flex gap-[5px] shrink-0">
            <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57] shadow-[0_0_5px_#FF5F5770]" />
            <div className="w-[11px] h-[11px] rounded-full bg-[#FFBD2E] shadow-[0_0_5px_#FFBD2E70]" />
            <div className="w-[11px] h-[11px] rounded-full bg-[#28C840] shadow-[0_0_5px_#28C84070]" />
          </div>

          <div
            className="flex-1 flex items-center gap-2 rounded-md px-3 py-[7px] min-w-0 border"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke={accentColor} strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[11px] text-white/40 font-mono truncate">{domain}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[9px] uppercase tracking-widest" style={{ color: accentColor }}>Live</span>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all text-xs border border-white/8 hover:border-white/20"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              ↗
            </a>
          </div>
        </div>

        {/* Screenshot / placeholder viewport */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>

          {hasScreenshots && current ? (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${activePage}-${view}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {view === "mobile" && current.mobile ? (
                  /* Phone frame */
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(8,8,10,0.97)" }}>
                    <div className="absolute w-80 h-80 rounded-full blur-3xl" style={{ background: accentColor, opacity: 0.08 }} />
                    <div
                      className="relative z-10 h-[88%] flex flex-col rounded-[2.2rem] overflow-hidden border-[2.5px] shadow-2xl"
                      style={{ aspectRatio: "9/19.5", borderColor: `${accentColor}35` }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 rounded-b-2xl z-20"
                        style={{ background: "rgba(8,8,10,0.98)", borderBottom: `1.5px solid ${accentColor}20` }} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={current.mobile} alt={`${title} mobile`} className="w-full h-full object-cover object-top" draggable={false} />
                    </div>
                  </div>
                ) : (
                  /* Desktop auto-scroll */
                  <div className="absolute inset-0 overflow-hidden bg-white">
                    <motion.div animate={scrollControls} className="absolute inset-x-0 top-0" style={{ willChange: "transform" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={current.desktop} alt={`${title} — ${current.label}`} className="w-full h-auto block" draggable={false} />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            /* ── No-screenshot placeholder ──────────────────────────────── */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6" style={{ background: "rgba(8,8,10,0.97)" }}>
              <div className="absolute w-96 h-96 rounded-full blur-3xl" style={{ background: accentColor, opacity: 0.06 }} />
              <motion.div
                className="relative z-10 flex flex-col items-center gap-5 text-center px-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                  style={{ background: `${accentColor}12`, borderColor: `${accentColor}30` }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={accentColor} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">{domain}</p>
                  <p className="text-white/30 text-xs">Visit the live website to explore</p>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${accentColor}dd, ${accentColor}99)`, boxShadow: `0 8px 24px ${accentColor}35` }}
                >
                  Open website ↗
                </a>
              </motion.div>
            </div>
          )}

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(8,8,10,0.6), transparent)" }} />
        </div>
      </motion.div>

      {/* ── Controls bar (only if screenshots exist) ─────────────────────────── */}
      {hasScreenshots && (
        <div className="flex items-center justify-between mt-5 gap-4 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {screenshots.map((s, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className="relative px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200"
                style={{ color: activePage === i ? accentColor : "#666" }}
              >
                {activePage === i && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}35` }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            ))}
          </div>

          {current?.mobile && (
            <div className="flex items-center rounded-full p-1 gap-1 border border-dark-300" style={{ background: "rgba(255,255,255,0.03)" }}>
              {(["desktop", "mobile"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="relative px-3 py-1.5 rounded-full text-xs capitalize transition-colors duration-200"
                  style={{ color: view === v ? "#fff" : "#555" }}
                >
                  {view === v && (
                    <motion.span layoutId="activeView" className="absolute inset-0 rounded-full bg-dark-300" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <span className="relative z-10">{v}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Tech stack + Features ────────────────────────────────────────────── */}
      {(techStack.length > 0 || features.length > 0) && (
        <div className="grid md:grid-cols-2 gap-8 mt-10 pt-10 border-t border-dark-200/60">
          {techStack.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-mid mb-5">Built with</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                    style={{ color: accentColor, borderColor: `${accentColor}35`, background: `${accentColor}0e` }}
                  >
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: accentColor }} />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {features.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-mid mb-5">Features delivered</p>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold"
                      style={{ background: `${accentColor}18`, color: accentColor }}
                    >✓</span>
                    <span className="text-sm text-neutral-muted leading-tight">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── Bottom bar ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap mt-8 pt-8 border-t border-dark-200/40">
        <div className="flex gap-2 flex-wrap">
          {BADGES.map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-dark-300 text-neutral-mid"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <span>{b.icon}</span>{b.label}
            </span>
          ))}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${accentColor}ee, ${accentColor}99)`,
            boxShadow: `0 8px 32px ${accentColor}40`,
          }}
        >
          Visit live site <span className="text-base leading-none">→</span>
        </a>
      </div>
    </div>
  );
}
