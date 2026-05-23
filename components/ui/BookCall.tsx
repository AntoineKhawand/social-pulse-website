"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookCallProps {
  label?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BookCall({
  label = "Book a free consultation",
  variant = "primary",
  size = "md",
  className = "",
}: BookCallProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 md:px-8 py-3.5 text-sm",
    lg: "px-8 md:px-10 py-4 text-base",
  };

  const variantClasses = {
    primary:
      "bg-brand hover:bg-brand-dark text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]",
    outline:
      "border border-brand text-white hover:bg-brand hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]",
    ghost:
      "text-brand-light hover:text-white border border-transparent hover:border-brand/30",
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full font-medium transition-all duration-300 active:scale-95 ${className}`}
      >
        {label}
      </button>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModalOpen(false)}
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-dark-100 rounded-2xl md:rounded-3xl border border-dark-300 overflow-hidden"
            >
              {/* Close */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-300 hover:bg-dark-400 flex items-center justify-center text-neutral-muted hover:text-white transition-colors text-sm z-10"
              >
                ✕
              </button>

              <div className="p-6 md:p-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-brand/15 flex items-center justify-center mb-5"
                  style={{ boxShadow: "0 0 30px rgba(124,58,237,0.15)" }}
                >
                  <svg className="w-6 h-6 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-2">
                  Book a free consultation
                </h3>
                <p className="text-neutral-muted text-sm md:text-base mb-6 leading-relaxed">
                  Tell us a bit about your project and we&apos;ll find a time that works for you.
                  We typically respond within 24 hours.
                </p>

                {/* Calendly embed / contact redirect */}
                <p className="text-xs uppercase tracking-widest text-neutral-mid mb-4">
                  Send us a message instead
                </p>
                <a
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-medium transition-all duration-300"
                >
                  Go to contact form
                  <span className="text-lg leading-none">→</span>
                </a>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dark-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-dark-100 px-3 text-[10px] uppercase tracking-widest text-neutral-mid">Or</span>
                  </div>
                </div>

                <a
                  href="mailto:socialpulselb@gmail.com?subject=Free%20Consultation%20Request&body=Hi%20Social%20Pulse%20Team%2C%0A%0AI'd%20like%20to%20book%20a%20free%20consultation%20for%20my%20project."
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-dark-300 text-neutral-muted hover:text-white hover:border-brand-light text-sm font-medium transition-all duration-300"
                >
                  Email us directly
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
