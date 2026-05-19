"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "sp_cookie_consent";

// ─── Replace with your GA4 Measurement ID ────────────────────────────────────
const GA_ID = "G-XXXXXXXXXX";
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function loadAnalytics() {
  if (typeof window === "undefined" || GA_ID === "G-XXXXXXXXXX") return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") {
      loadAnalytics();
    } else if (!stored) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    loadAnalytics();
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-[380px] z-[200]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="bg-dark-100/95 border border-dark-300 rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🍪</span>
              <p className="text-white text-sm font-semibold">Cookie preferences</p>
            </div>

            {/* Body */}
            <p className="text-neutral-muted text-xs leading-relaxed mb-4">
              We use analytics to understand how visitors use this site and make it better.
              No data is ever sold. This banner is required under GDPR for our EU and international clients.
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={accept}
                className="flex-1 px-4 py-2.5 rounded-xl bg-brand text-white text-xs font-medium hover:bg-brand-dark transition-colors duration-200"
              >
                Accept all
              </button>
              <button
                onClick={decline}
                className="flex-1 px-4 py-2.5 rounded-xl border border-dark-300 text-neutral-muted text-xs font-medium hover:border-neutral-mid hover:text-white transition-colors duration-200"
              >
                Decline
              </button>
              <Link
                href="/privacy"
                className="text-[10px] text-neutral-mid hover:text-white transition-colors shrink-0 underline underline-offset-2"
              >
                Privacy
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
