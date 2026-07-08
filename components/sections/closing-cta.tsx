import { Reveal } from "@/components/motion/reveal";
import { BookingButton } from "@/components/booking/booking-button";
import { site } from "@/content/site";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-5 py-28 text-center md:px-8 md:py-36">
        <Reveal>
          <h2 className="text-4xl text-paper md:text-6xl">{site.tagline}</h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-paper/70">
            Whenever you are ready, the door is open. There is no cost to simply talk.
          </p>
          <div className="mt-10 flex justify-center">
            <BookingButton className="bg-brass text-ink hover:bg-brass/90" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
