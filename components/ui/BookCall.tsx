"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Send } from "react-iconly";

// ← Replace with your Cal.com username once you create an account at cal.com
const CAL_USERNAME = "social-pulse";

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

  const hasCalAccount = CAL_USERNAME.trim() !== "";
  const calEmbedUrl = `https://cal.com/${CAL_USERNAME}?embed=true&theme=dark&hideEventTypeDetails=false&layout=month_view`;

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
              className={`relative w-full bg-dark-100 rounded-2xl md:rounded-3xl border border-dark-300 overflow-hidden ${
                hasCalAccount ? "max-w-3xl" : "max-w-lg"
              }`}
            >
              {/* Close */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-300 hover:bg-dark-400 flex items-center justify-center text-neutral-muted hover:text-white transition-colors text-sm z-10"
              >
                ✕
              </button>

              {hasCalAccount ? (
                /* ── Cal.com embed ── */
                <div className="flex flex-col">
                  <div className="px-6 md:px-8 pt-7 pb-4">
                    <div className="flex items-center gap-3 mb-1">
                      <div
                        className="w-9 h-9 rounded-xl bg-brand/15 flex items-center justify-center shrink-0"
                        style={{ boxShadow: "0 0 20px rgba(124,58,237,0.15)" }}
                      >
                        <span className="text-brand-light">
                          <Calendar set="light" size={20} primaryColor="currentColor" />
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-white leading-tight">
                          Book a free consultation
                        </h3>
                        <p className="text-neutral-muted text-xs">Pick a time that works for you</p>
                      </div>
                    </div>
                  </div>

                  <iframe
                    src={calEmbedUrl}
                    className="w-full border-0"
                    style={{ height: "min(600px, 70vh)" }}
                    title="Book a free consultation with Social Pulse"
                    loading="lazy"
                  />
                </div>
              ) : (
                /* ── Fallback (no Cal account yet) ── */
                <div className="p-6 md:p-10">
                  <div className="w-12 h-12 rounded-2xl bg-brand/15 flex items-center justify-center mb-5"
                    style={{ boxShadow: "0 0 30px rgba(124,58,237,0.15)" }}
                  >
                    <span className="text-brand-light">
                      <Calendar set="light" size={24} primaryColor="currentColor" />
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-2">
                    Book a free consultation
                  </h3>
                  <p className="text-neutral-muted text-sm md:text-base mb-6 leading-relaxed">
                    Tell us a bit about your project and we&apos;ll find a time that works for you.
                    We typically respond within 24 hours.
                  </p>

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
                    <Send set="light" size={16} primaryColor="currentColor" />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
