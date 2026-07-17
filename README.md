# dusttemple-website

Dust Temple website code.

Calm, non-transactional homepage for Mmanisha Sandip M's spiritual practice (Dustt Temple). Built with Next.js 15 (App Router), Tailwind CSS v4, and shadcn/ui.

## Development

- `npm run dev` — local dev server at http://localhost:3000
- `npm run build` — production build
- `npm run test:e2e` — Playwright behavior + accessibility tests

## Notes

- Design spec: `docs/superpowers/specs/2026-07-08-dusttemple-homepage-redesign-design.md`
- Implementation plan: `docs/superpowers/plans/2026-07-08-dusttemple-homepage.md`
- Booking: Cal.com (`manishaa-motarwar-zwznrp/30min`), swappable in `components/booking/booking-button.tsx`
- Deploy target: Vercel (framework auto-detected as Next.js)
- Design direction: "Ephemeris, stilled" — warm oat paper, ocean-teal accent, antique brass; Fraunces / Hanken Grotesk / IBM Plex Mono
