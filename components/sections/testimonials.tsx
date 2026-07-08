"use client";
import { useState } from "react";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (d: number) => setI((p) => (p + d + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="border-y border-ink/10 bg-paper-alt">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center md:px-8 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">Kind words</p>
        <blockquote className="mt-8">
          <p className="font-display text-2xl leading-snug text-ink md:text-3xl">“{t.quote}”</p>
          <footer className="mt-8 font-mono text-sm uppercase tracking-[0.14em] text-teal-deep">{t.name}</footer>
        </blockquote>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className="rounded-full border border-ink/20 p-2 text-ink transition-colors hover:border-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper-alt">
            <Arrow dir="left" />
          </button>
          <div className="flex gap-2" aria-hidden="true">
            {testimonials.map((_, k) => (
              <span key={k} className={`h-1.5 w-1.5 rounded-full ${k === i ? "bg-teal-deep" : "bg-ink/20"}`} />
            ))}
          </div>
          <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className="rounded-full border border-ink/20 p-2 text-ink transition-colors hover:border-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper-alt">
            <Arrow dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"
      style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
