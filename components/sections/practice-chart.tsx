"use client";
import { useEffect, useRef, useState } from "react";
import { DustField } from "@/components/motion/dust-field";
import { site } from "@/content/site";

type Star = { label: string; blurb: string; x: number; y: number };

const CENTER = { x: 229, y: 224 };

const STARS: Star[] = [
  { label: "Mindfulness", blurb: "Practical guidance toward a grounded, joyful day-to-day.", x: 66, y: 244 },
  { label: "Numerology", blurb: "The numbers that shape your personality, timing, and path.", x: 96, y: 150 },
  { label: "Astrology", blurb: "Your birth chart, read for who you are and what is unfolding.", x: 214, y: 74 },
  { label: "Akashic", blurb: "Insight into your soul's journey and life purpose.", x: 354, y: 126 },
  { label: "Aura", blurb: "A look at your energy field and where it seeks balance.", x: 396, y: 252 },
  { label: "Mediumship", blurb: "Tender sessions to connect with loved ones who have passed.", x: 300, y: 358 },
  { label: "Angel cards", blurb: "Gentle messages drawn for your current questions.", x: 132, y: 350 },
];

const CONSTELLATION =
  "M66 244 L96 150 L214 74 L354 126 L396 252 L300 358 L132 350";

export function PracticeChart() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

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

  const active = hover === null ? null : STARS[hover];

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        ref={ref}
        className="relative aspect-square overflow-hidden rounded-[28px] border border-brass/20 bg-paper/50"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(58% 58% at 50% 42%, rgba(46,147,172,0.10), transparent 72%)" }}
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
          <circle cx={CENTER.x} cy={CENTER.y} r="176" stroke="var(--color-brass)" strokeWidth="0.6" opacity="0.14" />
          <circle cx={CENTER.x} cy={CENTER.y} r="116" stroke="var(--color-teal)" strokeWidth="0.6" opacity="0.14" />

          <path
            d={CONSTELLATION}
            stroke="var(--color-teal)"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.4"
            style={{
              strokeDasharray: 1300,
              strokeDashoffset: drawn ? 0 : 1300,
              transition: "stroke-dashoffset 2400ms ease",
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

          {STARS.map((s, i) => (
            <g
              key={s.label}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover((h) => (h === i ? null : h))}
              style={{
                opacity: drawn ? 1 : 0,
                transition: `opacity 700ms ease ${450 + i * 150}ms`,
                cursor: "default",
              }}
            >
              <title>{`${s.label} — ${s.blurb}`}</title>
              <circle
                cx={s.x}
                cy={s.y}
                r={hover === i ? 13 : 9}
                fill="var(--color-brass)"
                opacity={hover === i ? 0.22 : 0.12}
                style={{ transition: "r 220ms ease, opacity 220ms ease" }}
              />
              <circle
                cx={s.x}
                cy={s.y}
                r={hover === i ? 5 : 4}
                fill="var(--color-brass)"
                className={i % 3 === 0 ? "chart-star" : undefined}
                style={{ transition: "r 220ms ease" }}
              />
              <text
                x={s.x}
                y={s.y + 26}
                textAnchor="middle"
                fill="var(--color-ink)"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12.5px",
                  letterSpacing: "0.05em",
                  opacity: hover === null || hover === i ? 0.92 : 0.4,
                  transition: "opacity 220ms ease",
                }}
              >
                {s.label}
              </text>
            </g>
          ))}
        </svg>

        {active ? (
          <div
            className="pointer-events-none absolute z-10 w-44 -translate-x-1/2 -translate-y-full rounded-xl border border-brass/25 bg-paper px-3 py-2 text-center text-xs leading-relaxed text-ink shadow-sm"
            style={{ left: `${(active.x / 460) * 100}%`, top: `${((active.y - 26) / 460) * 100}%` }}
          >
            {active.blurb}
          </div>
        ) : null}
      </div>
      <p className="mt-5 text-center font-mono text-xs uppercase tracking-[0.22em] text-quiet">
        {site.practitioner} · seven ways in
      </p>
    </div>
  );
}
