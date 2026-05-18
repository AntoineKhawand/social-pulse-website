"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  once?: boolean;
}

const variants = {
  up: { initial: { y: 40, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  left: { initial: { x: -40, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  right: { initial: { x: 40, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  none: { initial: { opacity: 0 }, animate: { opacity: 1 } },
};

export default function RevealBlock({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-8%" });
  const v = variants[direction];

  return (
    <motion.div
      ref={ref}
      initial={v.initial}
      animate={isInView ? v.animate : v.initial}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
