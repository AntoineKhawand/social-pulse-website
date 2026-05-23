"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(pct);
      spring.set(pct);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [spring]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[200] h-[2.5px] bg-brand origin-left"
      style={{ width: `${progress}%` }}
    />
  );
}
