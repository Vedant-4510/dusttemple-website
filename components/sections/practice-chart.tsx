"use client";
import { useEffect, useRef, useState } from "react";
import { DustField } from "@/components/motion/dust-field";

const POINTS = [
  { label: "Numerology", x: 98, y: 138 },
  { label: "Astrology", x: 216, y: 86 },
  { label: "Akashic", x: 342, y: 146 },
  { label: "Aura", x: 386, y: 262 },
  { label: "Mediumship", x: 280, y: 344 },
  { label: "Angel cards", x: 148, y: 348 },
  { label: "Mindfulness", x: 80, y: 256 },
];

const LOOP =
  POINTS.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ") + " Z";

const CENTER = { x: 221, y: 219 };

export function PracticeChart() {
  const ref = useRef<HTMLDivElement | null>(null);
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
    <div className="mx-auto w-full max-w-md">
      <div
        ref={ref}
        className="relative aspect-square overflow-hidden rounded-[28px] border border-brass/20 bg-paper/50"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 58% at 50% 42%, rgba(46,147,172,0.10), transparent 72%)",
          }}
        />
        <DustField className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
        <svg
          viewBox="0 0 460 460"
          fill="none"
          role="img"
          aria-label="A star map of Manisha's seven practices: numerology, astrology, akashic reading, aura reading, mediumship, angel cards, and mindfulness — gathered around her as the guide at the centre."
          className="absolute inset-0 h-full w-full"
          style={drawn ? { animation: "chart-float 9s ease-in-out infinite" } : undefined}
        >
          <circle cx={CENTER.x} cy={CENTER.y} r="170" stroke="var(--color-brass)" strokeWidth="0.6" opacity="0.16" />
          <circle cx={CENTER.x} cy={CENTER.y} r="114" stroke="var(--color-teal)" strokeWidth="0.6" opacity="0.16" />

          <path
            d={LOOP}
            stroke="var(--color-teal)"
            strokeWidth="1"
            opacity="0.5"
            style={{
              strokeDasharray: 1600,
              strokeDashoffset: drawn ? 0 : 1600,
              transition: "stroke-dashoffset 2200ms ease",
            }}
          />

          <circle cx={CENTER.x} cy={CENTER.y} r="17" stroke="var(--color-brass)" strokeWidth="0.6" opacity="0.35" />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="4.5"
            fill="var(--color-brass)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 700ms ease 300ms" }}
          />

          {POINTS.map((p, i) => (
            <g
              key={p.label}
              style={{ opacity: drawn ? 1 : 0, transition: `opacity 700ms ease ${500 + i * 150}ms` }}
            >
              <circle cx={p.x} cy={p.y} r="9" fill="var(--color-brass)" opacity="0.12" />
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="var(--color-brass)"
                className={i % 3 === 0 ? "chart-star" : undefined}
              />
              <text
                x={p.x}
                y={p.y + 24}
                textAnchor="middle"
                fill="var(--color-ink)"
                style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em" }}
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="mt-5 text-center font-mono text-xs uppercase tracking-[0.22em] text-quiet">
        Manisha Motarwar · seven ways in
      </p>
    </div>
  );
}
