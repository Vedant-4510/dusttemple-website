import { BookingButton } from "@/components/booking/booking-button";
import { SiteHeader } from "@/components/layout/site-header";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-paper p-16">
        <h1 className="font-display text-6xl text-ink">Dustt Temple</h1>
        <p className="mt-4 font-body text-quiet">Warm oat, ocean teal, antique brass.</p>
        <p className="mt-2 font-mono text-teal-deep">11 · 22 · master numbers</p>
        <div className="mt-8">
          <BookingButton />
        </div>
        <Services />
      </main>
    </>
  );
}
