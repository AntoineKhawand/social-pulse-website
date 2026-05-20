"use client";

import { useState } from "react";

const services = [
  "Branding & Identity",
  "Social Media",
  "Video & Motion",
  "Web Design",
  "Photography",
  "Full Package",
];

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full bg-dark-200 border border-dark-300 focus:border-brand rounded-xl px-4 py-3.5 text-white placeholder:text-neutral-mid text-sm outline-none transition-colors min-h-[48px]";

export default function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const toggle = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        company: formData.get("company"),
        services: selected.join(", "),
        budget: formData.get("budget"),
        message: formData.get("message"),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setStatus("success");
    } catch (err: any) {
      console.error("Submit error:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] text-center">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand flex items-center justify-center text-xl md:text-2xl mb-5 md:mb-6 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
          ✓
        </div>
        <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-3">Message received!</h3>
        <p className="text-neutral-muted text-sm">We&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className={inputClass}
            autoComplete="email"
            inputMode="email"
          />
        </div>
      </div>

      {/* Company */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="company">
          Company / Brand
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Your company name"
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      {/* Services */}
      <div className="flex flex-col gap-2.5">
        <p className="text-xs uppercase tracking-widest text-neutral-mid">Services you need</p>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] ${
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
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="budget">
          Budget range
        </label>
        <select
          id="budget"
          name="budget"
          className={`${inputClass} appearance-none cursor-pointer`}
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
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-widest text-neutral-mid" htmlFor="message">
          Tell us about your project *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you looking to achieve? The more detail, the better."
          className={`${inputClass} min-h-[120px] resize-none`}
        />
      </div>

      {errorMessage && (
        <div className="text-red-400 text-sm bg-red-950/40 border border-red-900/60 rounded-xl px-4 py-3">
          ⚠️ {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto sm:self-start px-8 py-4 rounded-full bg-brand text-white font-medium text-sm hover:bg-brand-dark hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed min-h-[52px]"
      >
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
