"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [label, setLabel] = useState("");
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const trailX = useSpring(mouseX, { damping: 40, stiffness: 150 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 150 });

  useEffect(() => {
    // Don't render on touch devices — no cursor, no wasted event listeners
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    setMounted(true);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest(
        "a, button, [data-cursor], [data-cursor-label]"
      ) as HTMLElement | null;
      if (hoverable) {
        setIsHovering(true);
        setLabel(hoverable.dataset.cursorLabel || "");
      } else {
        setIsHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", handleHover);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", handleHover);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 0 : 8,
            height: isHovering ? 0 : 8,
            opacity: isClicking ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none flex items-center justify-center"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-white flex items-center justify-center overflow-hidden"
          animate={{
            width: isHovering ? 80 : 36,
            height: isHovering ? 80 : 36,
            backgroundColor: isHovering ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0)",
            borderColor: isHovering ? "rgb(167,139,250)" : "rgba(255,255,255,0.6)",
            scale: isClicking ? 0.85 : 1,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {label && (
            <span className="text-[9px] font-medium tracking-widest uppercase text-brand-light text-center leading-tight px-1">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
