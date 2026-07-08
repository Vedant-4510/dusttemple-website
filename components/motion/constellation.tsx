"use client";
import { useEffect, useRef, useState } from "react";

export function Constellation({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [draw, setDraw] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setDraw(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDraw(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lineStyle = {
    strokeDasharray: 1200,
    strokeDashoffset: draw ? 0 : 1200,
    transition: "stroke-dashoffset 2400ms ease",
  } as const;

  return (
    <svg ref={ref} viewBox="0 0 400 400" fill="none" aria-hidden="true" className={className}>
      <g stroke="var(--color-teal)" strokeWidth="1" style={lineStyle}>
        <path d="M60 90 L130 140 L120 220 L200 250 L280 200 L330 260" />
        <path d="M130 140 L190 110 L280 130 L330 90" />
      </g>
      <g fill="var(--color-brass)">
        {[[60,90,3.5],[130,140,4.5],[190,110,3],[280,130,4],[330,90,3],[120,220,3.5],[200,250,5],[280,200,3.5],[330,260,3]].map(([cx,cy,r],i)=>(
          <circle key={i} cx={cx} cy={cy} r={r} style={{ opacity: draw ? 1 : 0, transition: `opacity 800ms ease ${400 + i*120}ms` }} />
        ))}
      </g>
      <circle cx="200" cy="200" r="150" stroke="var(--color-brass)" strokeWidth="0.6" opacity="0.3" />
    </svg>
  );
}
