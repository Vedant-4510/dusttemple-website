import { Reveal } from "@/components/motion/reveal";
import { Constellation } from "@/components/motion/constellation";
import { site } from "@/content/site";

export function MeetManisha() {
  return (
    <section id="about" className="border-t border-ink/10 bg-paper-alt">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">The guide</p>
          <h2 className="mt-5 text-4xl text-ink md:text-5xl">A soft place to begin.</h2>
          <div className="mt-6 space-y-4 text-lg text-quiet">
            <p>
              I am {site.practitioner}. For years, people have come to me not for answers so much as for company —
              someone patient to sit with the grief, the questions, the turning points.
            </p>
            <p>
              My work draws on numerology, astrology, and the quieter arts of listening. Whatever brings you here,
              you will be met with warmth, and never any hurry.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120} className="flex justify-center">
          <Constellation className="w-full max-w-sm" />
        </Reveal>
      </div>
    </section>
  );
}
