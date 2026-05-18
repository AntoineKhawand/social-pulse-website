"use client";

import { useState } from "react";

const services = [
  "Branding & Identity",
  "Social Media Management",
  "Video & Motion",
  "Web Design & Development",
  "Photography",
  "Full Package",
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const toggle = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate async submission — replace with your API route or Formspree endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center text-2xl mb-6 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
          ✓
        </div>
        <h3 className="font-display font-bold text-2xl text-white mb-3">Message received!</h3>
        <p className="text-neutral-muted">We&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Name + Email */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="bg-dark-200 border border-dark-300 focus:border-brand rounded-xl px-5 py-4 text-white placeholder:text-neutral-mid text-sm outline-none transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="bg-dark-200 border border-dark-300 focus:border-brand rounded-xl px-5 py-4 text-white placeholder:text-neutral-mid text-sm outline-none transition-colors"
          />
        </div>
      </div>

      {/* Company */}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="company">
          Company / Brand
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Your company name"
          className="bg-dark-200 border border-dark-300 focus:border-brand rounded-xl px-5 py-4 text-white placeholder:text-neutral-mid text-sm outline-none transition-colors"
        />
      </div>

      {/* Services */}
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-neutral-mid">
          Services you need
        </p>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              className={`px-4 py-2 rounded-full text-xs transition-all duration-200 ${
                selected.includes(s)
                  ? "bg-brand text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                  : "border border-dark-300 text-neutral-muted hover:border-brand-light hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <input type="hidden" name="services" value={selected.join(", ")} />
      </div>

      {/* Budget */}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="budget">
          Budget range
        </label>
        <select
          id="budget"
          name="budget"
          className="bg-dark-200 border border-dark-300 focus:border-brand rounded-xl px-5 py-4 text-white text-sm outline-none transition-colors appearance-none"
        >
          <option value="">Select a range</option>
          <option value="under-1k">Under $1,000</option>
          <option value="1k-3k">$1,000 – $3,000</option>
          <option value="3k-7k">$3,000 – $7,000</option>
          <option value="7k-15k">$7,000 – $15,000</option>
          <option value="15k+">$15,000+</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="message">
          Tell us about your project *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you looking to achieve? The more detail, the better."
          className="bg-dark-200 border border-dark-300 focus:border-brand rounded-xl px-5 py-4 text-white placeholder:text-neutral-mid text-sm outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="px-8 py-4 rounded-full bg-brand text-white font-medium text-sm hover:bg-brand-dark hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
