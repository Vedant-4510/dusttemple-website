import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { outcomes } from "@/content/outcomes";

const GLYPHS: Record<string, ReactNode> = {
  "Emotional well-being": <path d="M16 25C7 18 8 9 16 13C24 9 25 18 16 25Z" />,
  "Physical health": (
    <>
      <path d="M16 6C9 11 9 21 16 26C23 21 23 11 16 6Z" />
      <path d="M16 9V23" />
    </>
  ),
  Relationships: (
    <>
      <circle cx="13" cy="16" r="6" />
      <circle cx="19" cy="16" r="6" />
    </>
  ),
  "Spiritual development": (
    <>
      <path d="M6 22H26" />
      <path d="M11 22a5 5 0 0 1 10 0" />
      <path d="M16 9v3M9.5 13l1.4 1.8M22.5 13 21 14.8" />
    </>
  ),
  "Personal growth": (
    <>
      <path d="M16 26V14" />
      <path d="M16 18C11 18 9 13 9 13C14 13 16 16 16 18Z" />
      <path d="M16 16C21 16 23 11 23 11C18 11 16 14 16 16Z" />
    </>
  ),
  "Solace and clarity": (
    <>
      <path d="M21 7A9 9 0 1 0 21 25 7 7 0 1 1 21 7Z" />
      <path d="M9 8v4M7 10h4" />
    </>
  ),
};

export function WhoIsThisFor() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">Who this is for</p>
        <h2 className="mt-5 max-w-2xl text-4xl text-ink md:text-5xl">
          Wherever you are, there is a way in.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {outcomes.map((o, i) => (
          <Reveal key={o.title} delay={i * 80}>
            <div className="group h-full rounded-2xl p-5 transition-colors duration-300 hover:bg-paper-alt/50">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brass/35 text-brass transition-colors duration-300 group-hover:border-brass/60 group-hover:bg-brass/[0.08]">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-7 w-7"
                >
                  {GLYPHS[o.title]}
                </svg>
              </span>
              <h3 className="text-xl text-ink transition-colors duration-300 group-hover:text-teal-deep">
                {o.title}
              </h3>
              <p className="mt-3 text-quiet">{o.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
