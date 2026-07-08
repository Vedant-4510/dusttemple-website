"use client";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  { k: "01", title: "Reach out", body: "Pick a time that suits you. No intake forms, no pressure — just a first hello." },
  { k: "02", title: "We meet", body: "Online or in person, we talk. You share what is on your heart, and we find where to begin." },
  { k: "03", title: "Ongoing guidance", body: "As often or as rarely as you need. This is your pace, and I am here for the long road." },
];

export function HowItWorks() {
  const ref = useRef<HTMLOListElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">How a session works</p>
        <h2 className="mt-5 max-w-2xl text-4xl text-ink md:text-5xl">Gentle from the very first step.</h2>
      </Reveal>

      <ol ref={ref} className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-x-8">
        <span
          aria-hidden="true"
          className="absolute left-[16.5%] right-[16.5%] top-[23px] hidden h-0 origin-left border-t border-dashed border-brass/45 md:block"
          style={{ transform: drawn ? "scaleX(1)" : "scaleX(0)", transition: "transform 1200ms ease 200ms" }}
        />
        {steps.map((s, i) => (
          <li
            key={s.k}
            className="relative flex flex-col items-center text-center"
            style={{
              opacity: drawn ? 1 : 0,
              transform: drawn ? "none" : "translateY(12px)",
              transition: `opacity 600ms ease ${i * 160}ms, transform 600ms ease ${i * 160}ms`,
            }}
          >
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-brass/40 bg-paper font-mono text-sm text-brass">
              {s.k}
            </span>
            <h3 className="mt-5 text-2xl text-ink">{s.title}</h3>
            <p className="mt-3 max-w-xs text-quiet">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
