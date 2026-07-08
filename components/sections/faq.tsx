import { Reveal } from "@/components/motion/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content/faq";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">Questions</p>
        <h2 className="mt-5 text-4xl text-ink md:text-5xl">Before you reach out.</h2>
      </Reveal>
      <Accordion className="mt-10 w-full">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q} className="border-ink/10">
            <AccordionTrigger className="text-left text-lg text-ink">{f.q}</AccordionTrigger>
            <AccordionContent className="text-quiet">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
