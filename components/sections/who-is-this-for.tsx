import { Reveal } from "@/components/motion/reveal";
import { outcomes } from "@/content/outcomes";

export function WhoIsThisFor() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">Who this is for</p>
        <h2 className="mt-5 max-w-2xl text-4xl text-ink md:text-5xl">
          Wherever you are, there is a way in.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {outcomes.map((o, i) => (
          <Reveal key={o.title} delay={i * 80}>
            <div className="border-t border-brass/40 pt-5">
              <h3 className="text-xl text-ink">{o.title}</h3>
              <p className="mt-3 text-quiet">{o.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
