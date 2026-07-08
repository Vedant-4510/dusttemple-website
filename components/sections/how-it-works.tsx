import { Reveal } from "@/components/motion/reveal";

const steps = [
  { k: "01", title: "Reach out", body: "Pick a time that suits you. No intake forms, no pressure — just a first hello." },
  { k: "02", title: "We meet", body: "Online or in person, we talk. You share what is on your heart, and we find where to begin." },
  { k: "03", title: "Ongoing guidance", body: "As often or as rarely as you need. This is your pace, and I am here for the long road." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">How a session works</p>
        <h2 className="mt-5 max-w-2xl text-4xl text-ink md:text-5xl">Gentle from the very first step.</h2>
      </Reveal>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.k} delay={i * 100}>
            <div>
              <span className="font-mono text-sm text-brass">{s.k}</span>
              <h3 className="mt-3 text-2xl text-ink">{s.title}</h3>
              <p className="mt-3 text-quiet">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
