import { Reveal } from "@/components/motion/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceGroups } from "@/content/services";

export function Services() {
  return (
    <section id="services" className="border-y border-ink/10 bg-paper-alt">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">What I offer</p>
          <h2 className="mt-5 text-4xl text-ink md:text-5xl">Ways we can work together.</h2>
        </Reveal>

        <div className="mt-16 space-y-16">
          {serviceGroups.map((grp) => (
            <Reveal key={grp.group}>
              <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                <div>
                  <h3 className="font-display text-2xl text-teal-deep">{grp.group}</h3>
                  <p className="mt-2 text-sm text-quiet">{grp.caption}</p>
                </div>
                <Accordion className="w-full">
                  {grp.services.map((s) => (
                    <AccordionItem key={s.name} value={s.name} className="border-ink/10">
                      <AccordionTrigger className="text-left">
                        <span className="text-lg text-ink">{s.name}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-quiet">{s.blurb}</p>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {s.offerings.map((o) => (
                            <li key={o} className="flex items-start gap-2 text-sm text-ink/80">
                              <span aria-hidden="true" className="mt-1 text-brass">✦</span>
                              {o}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
