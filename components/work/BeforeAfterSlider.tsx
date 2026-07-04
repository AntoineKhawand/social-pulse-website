"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface BeforeAfterPair {
  label: string;
  before: string;
  after: string;
}

interface BeforeAfterSliderProps {
  items: BeforeAfterPair[];
  accentColor: string;
}

export default function BeforeAfterSlider({ items, accentColor }: BeforeAfterSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchIsDrag = useRef(false);

  const current = items[activeIndex];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    touchIsDrag.current = false;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (!touchStart.current) { updatePosition(t.clientX); return; }
    if (!touchIsDrag.current) {
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      if (Math.abs(dx) <= Math.abs(dy)) return; // vertical scroll intent — let the page scroll
      touchIsDrag.current = true;
    }
    updatePosition(t.clientX);
  };
  const handleTouchEnd = () => {
    touchStart.current = null;
    touchIsDrag.current = false;
  };

  return (
    <div className="w-full">
      {/* Slider tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => { setActiveIndex(i); setSliderPos(50); }}
            className="relative px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200"
            style={{ color: activeIndex === i ? accentColor : "#666" }}
          >
            {activeIndex === i && (
              <motion.span
                layoutId="baTab"
                className="absolute inset-0 rounded-full"
                style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}35` }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden cursor-ew-resize select-none"
        style={{
          aspectRatio: "16/10",
          border: `1px solid ${accentColor}20`,
          boxShadow: `0 0 0 1px ${accentColor}10, 0 24px 64px rgba(0,0,0,0.45)`,
          touchAction: "pan-y",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* After image (full) */}
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${current.after})` }}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${current.before})`,
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          }}
        />

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] z-10 pointer-events-none"
          style={{
            left: `${sliderPos}%`,
            background: `linear-gradient(to bottom, ${accentColor}, rgba(255,255,255,0.8), ${accentColor})`,
            boxShadow: `0 0 12px ${accentColor}80, 0 0 24px ${accentColor}40`,
          }}
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center pointer-events-none shadow-lg"
          style={{
            left: `calc(${sliderPos}% - 20px)`,
            background: `linear-gradient(135deg, ${accentColor}, rgba(255,255,255,0.9))`,
            boxShadow: `0 0 20px ${accentColor}60, 0 0 40px ${accentColor}30`,
          }}
        >
          <svg className="w-4 h-4 text-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M8 3L3 8L8 13" />
            <path d="M16 3L21 8L16 13" />
            <path d="M8 11L3 16L8 21" />
            <path d="M16 11L21 16L16 21" />
          </svg>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-semibold backdrop-blur-sm"
            style={{ background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}40` }}
          >
            Before
          </span>
        </div>
        <div className="absolute bottom-4 right-4 z-10">
          <span className="px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-semibold backdrop-blur-sm"
            style={{ background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}40` }}
          >
            After
          </span>
        </div>
      </div>

      <p className="text-center text-[11px] text-neutral-mid mt-3 uppercase tracking-widest">
        Drag the slider to compare
      </p>
    </div>
  );
}
