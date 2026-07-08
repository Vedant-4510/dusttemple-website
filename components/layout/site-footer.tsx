import type { ReactElement } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { BookingButton } from "@/components/booking/booking-button";
import { site, socials } from "@/content/site";

const footerNav = [
  { label: "Home", href: "#top" },
  { label: "Blog", href: "#" },
  { label: "About", href: "#about" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Logo className="h-12 w-auto" />
          <BookingButton />
        </div>
        <p className="mt-10 max-w-md font-display text-2xl text-ink">{site.tagline}</p>
        <div className="mt-10 flex flex-col justify-between gap-8 border-t border-ink/10 pt-8 md:flex-row md:items-center">
          <nav className="flex gap-8">
            {footerNav.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="rounded-sm text-sm text-ink/80 hover:text-teal-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-quiet">Follow along</span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="rounded-sm text-ink/70 transition-colors hover:text-teal-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-10 text-xs text-quiet">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: "facebook" | "instagram" | "youtube" }) {
  const paths: Record<string, ReactElement> = {
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></>,
    youtube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l6 3-6 3z" /></>,
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}
