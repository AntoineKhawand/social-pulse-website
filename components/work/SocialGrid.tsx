"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SocialPost } from "@/lib/projects";

interface SocialGridProps {
  handle: string;
  posts: SocialPost[];
  accentColor: string;
}

type Tab = "post" | "reel" | "carousel";

// ── Tab icons ─────────────────────────────────────────────────────────────────

function GridIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 transition-colors ${active ? "text-white" : "text-white/35"}`} viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="9" height="9" rx="1.5"/>
      <rect x="13" y="2" width="9" height="9" rx="1.5"/>
      <rect x="2" y="13" width="9" height="9" rx="1.5"/>
      <rect x="13" y="13" width="9" height="9" rx="1.5"/>
    </svg>
  );
}

function ReelTabIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 transition-colors ${active ? "text-white" : "text-white/35"}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 3.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 1.5a3 3 0 110 6 3 3 0 010-6zm-5-3a1 1 0 110 2 1 1 0 010-2zm10 0a1 1 0 110 2 1 1 0 010-2zM12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/>
    </svg>
  );
}

function CarouselTabIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 transition-colors ${active ? "text-white" : "text-white/35"}`} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="5" width="13" height="13" rx="2"/>
      <path d="M18 7h1.5A1.5 1.5 0 0121 8.5v9a1.5 1.5 0 01-1.5 1.5H9.5A1.5 1.5 0 018 17.5V17" fillOpacity=".45"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="w-5 h-5 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  );
}

// ── Reel player lightbox ──────────────────────────────────────────────────────

function ReelPlayer({ post, onClose, onPrev, onNext, hasPrev, hasNext }: {
  post: SocialPost;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && post.videoSrc) videoRef.current.play().catch(() => {});
  }, [post.videoSrc]);

  // No video file — open on Instagram if URL available
  if (!post.videoSrc && post.instagramUrl) {
    if (typeof window !== "undefined") window.open(post.instagramUrl, "_blank");
    onClose();
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ background: "rgba(0,0,0,0.94)" }}
    >
      {hasPrev && (
        <button
          className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10 transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >←</button>
      )}

      <motion.div
        key={post.src}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ height: "85vh", aspectRatio: "9/16" }}
        onClick={(e) => e.stopPropagation()}
      >
        {post.videoSrc ? (
          <video
            ref={videoRef}
            src={post.videoSrc}
            className="w-full h-full object-cover"
            controls
            autoPlay
            playsInline
            loop
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.src} alt="Reel" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/55">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <PlayIcon />
              </div>
              <p className="text-white/70 text-xs text-center px-8 leading-relaxed">
                Re-run the capture script to<br/>download the video file.
              </p>
            </div>
          </>
        )}
      </motion.div>

      {hasNext && (
        <button
          className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10 transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >→</button>
      )}

      <button
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white text-xs transition-colors"
        onClick={onClose}
      >✕</button>
    </motion.div>
  );
}

// ── Image lightbox ────────────────────────────────────────────────────────────

function ImageLightbox({ post, index, total, onClose, onPrev, onNext }: {
  post: SocialPost;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // For carousels: all slides = cover + additional slides
  const allSlides = post.type === "carousel" && post.slides?.length
    ? [post.src, ...post.slides]
    : [post.src];

  const [slideIdx, setSlideIdx] = useState(0);
  const currentSlide = allSlides[slideIdx];
  const isCarousel = allSlides.length > 1;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ background: "rgba(0,0,0,0.92)" }}
    >
      {/* Post prev/next */}
      {!isCarousel && index > 0 && (
        <button
          className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10 transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >←</button>
      )}

      <motion.div
        key={post.src}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={currentSlide}
            alt={`Post ${index + 1}${isCarousel ? ` slide ${slideIdx + 1}` : ""}`}
            className="w-full block"
            style={{ maxHeight: "82vh", objectFit: "contain" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        {/* Carousel slide dots */}
        {isCarousel && (
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
            {allSlides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSlideIdx(i); }}
                className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{ background: i === slideIdx ? "#fff" : "rgba(255,255,255,0.35)", transform: i === slideIdx ? "scale(1.3)" : "scale(1)" }}
              />
            ))}
          </div>
        )}

        {/* Carousel slide arrows */}
        {isCarousel && slideIdx > 0 && (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white text-sm transition-colors"
            onClick={(e) => { e.stopPropagation(); setSlideIdx(slideIdx - 1); }}
          >←</button>
        )}
        {isCarousel && slideIdx < allSlides.length - 1 && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white text-sm transition-colors"
            onClick={(e) => { e.stopPropagation(); setSlideIdx(slideIdx + 1); }}
          >→</button>
        )}

        {/* Counter */}
        {!isCarousel && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] text-white/70">
            {index + 1} / {total}
          </div>
        )}
        {isCarousel && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] text-white/70">
            {slideIdx + 1} / {allSlides.length}
          </div>
        )}
      </motion.div>

      {/* Post prev/next */}
      {!isCarousel && index < total - 1 && (
        <button
          className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10 transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >→</button>
      )}

      <button
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white text-xs transition-colors"
        onClick={onClose}
      >✕</button>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SocialGrid({ handle, posts, accentColor }: SocialGridProps) {
  const [activeTab, setActiveTab] = useState<Tab>("post");
  const [lightbox,  setLightbox]  = useState<number | null>(null);
  const [hovered,   setHovered]   = useState<number | null>(null);
  const profileUrl = `https://www.instagram.com/${handle}/`;

  const byType = useMemo(() => ({
    post:     posts.filter((p) => !p.type || p.type === "post"),
    reel:     posts.filter((p) => p.type === "reel"),
    carousel: posts.filter((p) => p.type === "carousel"),
  }), [posts]);

  const availableTabs = useMemo<Tab[]>(() => {
    const tabs: Tab[] = [];
    if (byType.post.length > 0)     tabs.push("post");
    if (byType.reel.length > 0)     tabs.push("reel");
    if (byType.carousel.length > 0) tabs.push("carousel");
    return tabs;
  }, [byType]);

  // Ensure activeTab is always valid
  const currentTab = availableTabs.includes(activeTab) ? activeTab : (availableTabs[0] ?? "post");
  const current = byType[currentTab];

  const TAB_LABELS: Record<Tab, string> = {
    post:     `Posts`,
    reel:     `Reels`,
    carousel: `Carousels`,
  };

  return (
    <div className="w-full">
      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          borderColor: `${accentColor}20`,
          boxShadow: `0 0 0 1px ${accentColor}10, 0 24px 64px rgba(0,0,0,0.45), 0 0 40px ${accentColor}10`,
        }}
      >
        {/* ── Profile header ─────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ background: "rgba(10,10,12,0.98)", borderColor: `${accentColor}18` }}
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0 text-white/70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <p className="text-white text-sm font-semibold">@{handle}</p>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${accentColor}ee, ${accentColor}99)`,
              boxShadow: `0 4px 16px ${accentColor}35`,
            }}
          >
            View profile ↗
          </a>
        </div>

        {/* ── Tab bar ────────────────────────────────────────────────────────── */}
        {availableTabs.length > 1 && (
          <div
            className="flex border-b"
            style={{ background: "rgba(10,10,12,0.96)", borderColor: `${accentColor}12` }}
          >
            {availableTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setLightbox(null); }}
                className="relative flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium tracking-wide transition-colors"
                style={{ color: currentTab === tab ? "#fff" : "rgba(255,255,255,0.35)" }}
              >
                {tab === "post"     && <GridIcon active={currentTab === tab} />}
                {tab === "reel"     && <ReelTabIcon active={currentTab === tab} />}
                {tab === "carousel" && <CarouselTabIcon active={currentTab === tab} />}
                <span>{TAB_LABELS[tab]}</span>
                <span className="text-[10px] opacity-50">({byType[tab].length})</span>

                {currentTab === tab && (
                  <motion.div
                    layoutId="tabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px]"
                    style={{ background: "#fff" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── Grid ───────────────────────────────────────────────────────────── */}
        <div
          className={`grid gap-[2px] p-[2px] ${currentTab === "reel" ? "grid-cols-3" : "grid-cols-3"}`}
          style={{ background: `${accentColor}08` }}
        >
          <AnimatePresence mode="popLayout">
            {current.map((post, i) => {
              const isReel = post.type === "reel";
              const isCarousel = post.type === "carousel";

              return (
                <motion.div
                  key={post.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22, delay: i * 0.025 }}
                  className={`relative cursor-pointer overflow-hidden group ${isReel ? "aspect-[9/16]" : "aspect-square"}`}
                  style={{ background: "rgba(15,15,18,0.8)" }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setLightbox(i)}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.src}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Carousel badge */}
                  {isCarousel && (
                    <div className="absolute top-2 right-2 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="2" y="5" width="14" height="14" rx="2"/>
                        <path d="M18 7h1a2 2 0 012 2v9a2 2 0 01-2 2H9a2 2 0 01-2-2v-1" fillOpacity=".45"/>
                      </svg>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.38)" }}
                      >
                        <motion.div
                          initial={{ scale: 0.75 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.75 }}
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.35)" }}
                        >
                          {isReel
                            ? <PlayIcon />
                            : <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                          }
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-center py-4 border-t"
          style={{ background: "rgba(10,10,12,0.98)", borderColor: `${accentColor}15` }}
        >
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1.5"
          >
            View all on Instagram
            <span style={{ color: accentColor }}>↗</span>
          </a>
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          currentTab === "reel" ? (
            <ReelPlayer
              post={current[lightbox]}
              onClose={() => setLightbox(null)}
              onPrev={() => setLightbox(lightbox - 1)}
              onNext={() => setLightbox(lightbox + 1)}
              hasPrev={lightbox > 0}
              hasNext={lightbox < current.length - 1}
            />
          ) : (
            <ImageLightbox
              post={current[lightbox]}
              index={lightbox}
              total={current.length}
              onClose={() => setLightbox(null)}
              onPrev={() => setLightbox(lightbox - 1)}
              onNext={() => setLightbox(lightbox + 1)}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
}
