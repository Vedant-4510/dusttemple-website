"use client";
import { useEffect, useRef, useState } from "react";
import { DustField } from "@/components/motion/dust-field";
import { Arrive } from "@/components/motion/arrive";
import { ScrollCue } from "@/components/motion/scroll-cue";
import { BookingButton } from "@/components/booking/booking-button";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const dustWrapRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // Arrival breath: fade the atmosphere in once, just after first paint.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setMounted(true);
      return;
    }
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Depth on scroll: glow, dust, and text drift at different speeds and settle
  // as the hero leaves the viewport.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const height = rect.height || 1;
        const progress = Math.min(Math.max(-rect.top / height, 0), 1);
        if (glowRef.current) glowRef.current.style.transform = `translateY(${progress * -40}px)`;
        if (dustWrapRef.current) dustWrapRef.current.style.transform = `translateY(${progress * -70}px)`;
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${progress * -20}px)`;
          contentRef.current.style.opacity = String(1 - progress * 0.9);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden">
      <div
        ref={dustWrapRef}
        className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-out"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        <DustField className="h-full w-full" />
      </div>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[120%] w-[60%] -translate-x-1/3 rotate-6 transition-opacity duration-[1800ms] ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          background: "radial-gradient(55% 50% at 50% 20%, rgba(169,136,66,0.10), transparent 70%)",
        }}
      />
      <div ref={contentRef} className="relative mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pb-32 md:pt-40">
        <Arrive delay={0}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-teal-deep">
            Numerology · Astrology · Mediumship
          </p>
        </Arrive>
        <Arrive delay={140}>
          <h1 className="mt-6 max-w-4xl text-5xl text-ink md:text-7xl">
            We come from dust.
            <br />
            In between, we build a temple.
          </h1>
        </Arrive>
        <Arrive delay={280}>
          <p className="mt-6 max-w-xl text-lg text-quiet">
            Not of stone — of thought, of choice, of the quiet work of becoming. Sit with me, and let us tend to yours.
          </p>
        </Arrive>
        <Arrive delay={420}>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <BookingButton />
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-quiet">Online &amp; in person</span>
          </div>
        </Arrive>
      </div>
      <ScrollCue className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-10" />
    </section>
  );
}
