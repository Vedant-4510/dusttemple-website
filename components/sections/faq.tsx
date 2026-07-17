import { Reveal } from "@/components/motion/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content/faq";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">Questions</p>
        <h2 className="mt-5 max-w-2xl text-4xl text-ink md:text-5xl">Before you reach out.</h2>
      </Reveal>
      <Accordion className="mt-10 flex w-full max-w-2xl flex-col gap-3">
        {faqs.map((f) => (
          <AccordionItem
            key={f.q}
            value={f.q}
            className="group rounded-2xl border border-ink/10 bg-paper-alt/40 px-5 transition-colors duration-300 hover:bg-paper-alt/80"
          >
            <AccordionTrigger className="py-5 text-left text-lg text-ink hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="pb-5 font-body text-quiet">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
