"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  by?: "word" | "char";
  once?: boolean;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  by = "word",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  const tokens = by === "char" ? text.split("") : text.split(" ");

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`} aria-label={text}>
      {tokens.map((token, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {token}
            {by === "word" && i < tokens.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
