"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "@/components/brand/logo";
import { BookingButton } from "@/components/booking/booking-button";
import { nav } from "@/content/site";

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${solid ? "bg-paper/90 backdrop-blur border-b border-ink/10" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="#top" aria-label="Dustt Temple home">
          <Logo className="h-10 w-auto" priority />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-ink/80 transition-colors hover:text-teal-deep">
              {n.label}
            </Link>
          ))}
          <BookingButton className="py-2" />
        </nav>
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label="Open menu" className="rounded-md p-2 text-ink">
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="bg-paper p-6">
              <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-6">
                {nav.map((n) => (
                  <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-lg text-ink">
                    {n.label}
                  </Link>
                ))}
                <BookingButton className="mt-2 justify-center" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}
