import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceGroups } from "@/content/services";

const ILLUSTRATIONS: Record<string, ReactNode> = {
  Cosmic: (
    <>
      <ellipse cx="36" cy="36" rx="28" ry="12" transform="rotate(-22 36 36)" />
      <ellipse cx="36" cy="36" rx="18" ry="8" transform="rotate(-22 36 36)" />
      <circle cx="36" cy="36" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="57" cy="27" r="2.4" fill="currentColor" stroke="none" />
      <path d="M16 12v8M12 16h8" />
    </>
  ),
  Connection: (
    <>
      <path d="M46 13A22 22 0 1 0 46 59 17 17 0 1 1 46 13Z" />
      <circle cx="17" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="24" cy="34" r="1.3" fill="currentColor" stroke="none" />
      <path d="M14 45v6M11 48h6" />
    </>
  ),
  Practice: (
    <>
      <path d="M14 46a22 11 0 0 1 44 0" />
      <path d="M22 46a14 7 0 0 1 28 0" />
      <path d="M30 46a6 4 0 0 1 12 0" />
      <circle cx="36" cy="46" r="2" fill="currentColor" stroke="none" />
    </>
  ),
};

const offsets = serviceGroups.map((_, i) =>
  serviceGroups.slice(0, i).reduce((sum, g) => sum + g.services.length, 0)
);

export function Services() {
  return (
    <section id="services" className="border-y border-ink/10 bg-paper-alt">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">How I can help</p>
          <h2 className="mt-5 text-4xl text-ink md:text-5xl">Ways we can walk together.</h2>
        </Reveal>

        <div className="mt-16 space-y-14">
          {serviceGroups.map((grp, gi) => (
            <Reveal key={grp.group}>
              <div className="grid gap-8 md:grid-cols-[240px_1fr]">
                <div>
                  <span className="inline-flex text-brass">
                    <svg
                      viewBox="0 0 72 72"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-16 w-16"
                    >
                      {ILLUSTRATIONS[grp.group]}
                    </svg>
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-teal-deep">{grp.group}</h3>
                  <p className="mt-2 text-sm text-quiet">{grp.caption}</p>
                </div>

                <Accordion className="flex w-full flex-col gap-3">
                  {grp.services.map((s, si) => {
                    const num = String(offsets[gi] + si + 1).padStart(2, "0");
                    return (
                      <AccordionItem
                        key={s.name}
                        value={s.name}
                        className="group rounded-2xl border border-ink/10 bg-paper/40 px-5 transition-colors duration-300 hover:bg-paper/80"
                      >
                        <AccordionTrigger className="items-start gap-4 py-5 hover:no-underline [&>svg]:mt-1.5">
                          <span className="mt-1 font-mono text-xs tabular-nums text-brass">{num}</span>
                          <span className="flex-1">
                            <span className="block text-lg text-ink transition-colors duration-300 group-hover:text-teal-deep">
                              {s.name}
                            </span>
                            <span className="mt-1.5 block font-body text-sm leading-relaxed text-quiet">{s.blurb}</span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 pl-9">
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {s.offerings.map((o) => (
                              <li key={o} className="flex items-start gap-2 text-sm text-ink/80">
                                <span aria-hidden="true" className="mt-1 text-brass">✦</span>
                                {o}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
