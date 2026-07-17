import { DustField } from "@/components/motion/dust-field";
import { BookingButton } from "@/components/booking/booking-button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <DustField className="pointer-events-none absolute inset-0 h-full w-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[120%] w-[60%] -translate-x-1/3 rotate-6"
        style={{ background: "radial-gradient(55% 50% at 50% 20%, rgba(169,136,66,0.10), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pb-32 md:pt-40">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-teal-deep">
          Numerology · Astrology · Mediumship
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl text-ink md:text-7xl">
          We come from dust.
          <br />
          In between, we build a temple.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-quiet">
          Not of stone — of thought, of choice, of the quiet work of becoming. Sit with me, and let us tend to yours.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <BookingButton />
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-quiet">Online &amp; in person</span>
        </div>
      </div>
    </section>
  );
}
