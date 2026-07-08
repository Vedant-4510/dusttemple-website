"use client";
import { useState } from "react";
import Image from "next/image";
import { testimonials, type Testimonial } from "@/content/testimonials";

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Avatar({ person, size, className = "" }: { person: Testimonial; size: number; className?: string }) {
  const dim = { width: size, height: size };
  if (person.avatar) {
    return (
      <Image
        src={person.avatar}
        alt={person.name}
        width={size}
        height={size}
        style={dim}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={dim}
      className={`inline-flex items-center justify-center rounded-full bg-brass/15 font-display text-teal-deep ${className}`}
    >
      <span style={{ fontSize: Math.round(size * 0.38) }}>{initialsOf(person.name)}</span>
    </span>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (d: number) => setI((p) => (p + d + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="border-y border-ink/10 bg-paper-alt">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center md:px-8 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">Kind words</p>

        <span aria-hidden="true" className="mt-6 block font-display text-6xl leading-none text-brass/50">
          &ldquo;
        </span>

        <blockquote className="mt-2">
          <p className="font-display text-2xl leading-snug text-ink md:text-[1.7rem]">{t.quote}</p>
          <footer className="mt-9 flex items-center justify-center gap-3">
            <Avatar person={t} size={48} />
            <div className="text-left">
              <div className="font-mono text-sm uppercase tracking-[0.14em] text-teal-deep">{t.name}</div>
              {t.role ? <div className="text-sm text-quiet">{t.role}</div> : null}
            </div>
          </footer>
        </blockquote>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="rounded-full border border-ink/20 p-2 text-ink transition-colors hover:border-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper-alt"
          >
            <Arrow dir="left" />
          </button>

          <div className="flex items-center gap-3">
            {testimonials.map((person, k) => (
              <button
                key={person.name}
                type="button"
                aria-label={`Show testimonial from ${person.name}`}
                aria-pressed={k === i}
                onClick={() => setI(k)}
                className={`rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper-alt ${
                  k === i ? "opacity-100 ring-2 ring-teal ring-offset-2 ring-offset-paper-alt" : "opacity-55 hover:opacity-90"
                }`}
              >
                <Avatar person={person} size={36} />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="rounded-full border border-ink/20 p-2 text-ink transition-colors hover:border-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper-alt"
          >
            <Arrow dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
