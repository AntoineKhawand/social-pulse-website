"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Presentation } from "@/lib/projects";

interface PresentationViewerProps {
  presentation: Presentation;
  accentColor: string;
  title: string;
}

function DownloadIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function Lightbox({ pages, startIndex, aspectRatio, accentColor, onClose }: {
  pages: string[];
  startIndex: number;
  aspectRatio: "landscape" | "portrait";
  accentColor: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(pages.length - 1, i + 1));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 md:p-8 outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: "rgba(0,0,0,0.95)" }}
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
      autoFocus
    >
      {/* Page counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs text-white/70 font-mono">
        {index + 1} / {pages.length}
      </div>

      {/* Prev */}
      {index > 0 && (
        <button
          className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10 transition-colors"
          onClick={(e) => { e.stopPropagation(); prev(); }}
        >
          ←
        </button>
      )}

      {/* Slide */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-xl overflow-hidden shadow-2xl"
        style={{
          maxWidth: aspectRatio === "landscape" ? "88vw" : "clamp(280px, 54vw, 640px)",
          maxHeight: "82vh",
          width: "100%",
          boxShadow: `0 0 0 1px ${accentColor}25, 0 32px 80px rgba(0,0,0,0.7)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pages[index]}
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-contain block"
          style={{ maxHeight: "82vh" }}
        />

        {/* Accent bottom bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />
      </motion.div>

      {/* Next */}
      {index < pages.length - 1 && (
        <button
          className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10 transition-colors"
          onClick={(e) => { e.stopPropagation(); next(); }}
        >
          →
        </button>
      )}

      {/* Close */}
      <button
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white text-sm transition-colors"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[0.07] backdrop-blur-sm border border-white/[0.08] max-w-[80vw] overflow-x-auto">
        {pages.map((src, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
            className="relative shrink-0 rounded overflow-hidden transition-all duration-200"
            style={{
              width: 32,
              height: aspectRatio === "landscape" ? 18 : 24,
              outline: i === index ? `2px solid ${accentColor}` : "2px solid transparent",
              outlineOffset: 1,
              opacity: i === index ? 1 : 0.45,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function PresentationViewer({ presentation, accentColor, title }: PresentationViewerProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const { pages, pdfUrl, aspectRatio = "landscape" } = presentation;
  const coverPage = pages[0];
  const restPages = pages.slice(1);

  const thumbAspect = aspectRatio === "landscape" ? "aspect-video" : "aspect-[3/4]";

  if (pages.length === 0) {
    return (
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: `${accentColor}20` }}
      >
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ background: "rgba(10,10,12,0.98)", borderColor: `${accentColor}18` }}
        >
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-white text-sm font-semibold">{title} — Brand Portfolio</p>
          </div>
          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${accentColor}ee, ${accentColor}99)`,
                boxShadow: `0 4px 16px ${accentColor}35`,
              }}
            >
              <DownloadIcon />
              Download PDF
            </a>
          )}
        </div>
        <div
          className="flex items-center justify-center py-16 text-white/20 text-sm"
          style={{ background: `${accentColor}06` }}
        >
          Presentation slides coming soon
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          borderColor: `${accentColor}20`,
          boxShadow: `0 0 0 1px ${accentColor}10, 0 24px 64px rgba(0,0,0,0.45), 0 0 40px ${accentColor}10`,
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ background: "rgba(10,10,12,0.98)", borderColor: `${accentColor}18` }}
        >
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 shrink-0 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-white text-sm font-semibold">{title} — Brand Portfolio</p>
            <span className="text-white/25 text-xs font-mono">{pages.length} slides</span>
          </div>
          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${accentColor}ee, ${accentColor}99)`,
                boxShadow: `0 4px 16px ${accentColor}35`,
              }}
            >
              <DownloadIcon />
              Download PDF
            </a>
          )}
        </div>

        {/* ── Hero cover + sidebar grid ── */}
        <div
          className="p-[2px]"
          style={{ background: `${accentColor}08` }}
        >
          {restPages.length === 0 ? (
            // Single page — full width cover
            <div
              className={`relative cursor-pointer overflow-hidden rounded-xl group ${thumbAspect}`}
              onClick={() => setLightboxIndex(0)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverPage} alt="Slide 1" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
                <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                  <ExpandIcon />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[1fr] md:grid-cols-[2fr_1fr] gap-[2px]">
              {/* Cover */}
              <div
                className={`relative cursor-pointer overflow-hidden rounded-xl group ${thumbAspect}`}
                onClick={() => setLightboxIndex(0)}
                onMouseEnter={() => setHovered(0)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverPage} alt="Slide 1" className="w-full h-full object-cover" />
                <div
                  className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] text-white/70 font-mono"
                >
                  01
                </div>
                <AnimatePresence>
                  {hovered === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/30"
                    >
                      <motion.div
                        initial={{ scale: 0.75 }}
                        animate={{ scale: 1 }}
                        className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"
                      >
                        <ExpandIcon />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sidebar: 2 thumbnails stacked — each full column width */}
              <div className="flex flex-col gap-[2px]">
                {restPages.slice(0, 2).map((src, i) => {
                  const pageIndex = i + 1;
                  return (
                    <div
                      key={pageIndex}
                      className={`relative cursor-pointer overflow-hidden rounded-lg group ${thumbAspect}`}
                      onClick={() => setLightboxIndex(pageIndex)}
                      onMouseEnter={() => setHovered(pageIndex)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={`Slide ${pageIndex + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 text-[9px] text-white/60 font-mono">
                        {String(pageIndex + 1).padStart(2, "0")}
                      </div>
                      <AnimatePresence>
                        {hovered === pageIndex && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/35"
                          >
                            <motion.div
                              initial={{ scale: 0.75 }}
                              animate={{ scale: 1 }}
                              className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"
                            >
                              <ExpandIcon />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Remaining pages grid (page 4+) ── */}
          {restPages.length > 2 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-[2px] mt-[2px]">
              {restPages.slice(2).map((src, i) => {
                const pageIndex = i + 3;
                return (
                  <div
                    key={pageIndex}
                    className={`relative cursor-pointer overflow-hidden rounded-lg group ${thumbAspect}`}
                    onClick={() => setLightboxIndex(pageIndex)}
                    onMouseEnter={() => setHovered(pageIndex)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Slide ${pageIndex + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-sm rounded-full px-1.5 py-0.5 text-[9px] text-white/60 font-mono">
                      {String(pageIndex + 1).padStart(2, "0")}
                    </div>
                    <AnimatePresence>
                      {hovered === pageIndex && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/35"
                        >
                          <motion.div
                            initial={{ scale: 0.75 }}
                            animate={{ scale: 1 }}
                            className="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"
                          >
                            <ExpandIcon />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className="flex items-center justify-center py-4 border-t"
          style={{ background: "rgba(10,10,12,0.98)", borderColor: `${accentColor}15` }}
        >
          <button
            onClick={() => setLightboxIndex(0)}
            className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1.5"
          >
            View full presentation
            <span style={{ color: accentColor }}>↗</span>
          </button>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            pages={pages}
            startIndex={lightboxIndex}
            aspectRatio={aspectRatio}
            accentColor={accentColor}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
