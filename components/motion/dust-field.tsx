"use client";
import { useEffect, useRef } from "react";

export function DustField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let parts: { x: number; y: number; r: number; s: number; sway: number; amp: number; a: number; warm: boolean }[] = [];

    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(140, Math.floor(w / 10));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4, s: Math.random() * 0.24 + 0.05,
        sway: Math.random() * Math.PI * 2, amp: Math.random() * 0.5 + 0.2,
        a: Math.random() * 0.45 + 0.12, warm: Math.random() > 0.45,
      }));
    };

    const draw = () => {
      const h = canvas.clientHeight, w = canvas.clientWidth;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.y -= p.s; p.sway += 0.01; p.x += Math.sin(p.sway) * p.amp * 0.35;
        if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.fillStyle = p.warm ? `rgba(169,136,66,${p.a})` : `rgba(46,147,172,${p.a * 0.7})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    size(); draw();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(size, 150); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
