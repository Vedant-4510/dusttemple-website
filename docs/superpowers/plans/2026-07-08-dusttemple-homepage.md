# Dustt Temple Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the calm, non-transactional Dustt Temple homepage in Next.js, faithful to the "Ephemeris, stilled" design spec, deployed on Vercel.

**Architecture:** Next.js 15 App Router (React 19, TypeScript). A single homepage (`app/page.tsx`) composes ~10 presentational section components. All copy/data lives in typed `content/*` modules so sections are thin, data-driven views. Design tokens are CSS custom properties surfaced to Tailwind v4 via `@theme`; shadcn/ui primitives are themed to the palette. Motion is custom and calm (IntersectionObserver reveals, a Canvas dust field, an SVG constellation draw-in), all gated on `prefers-reduced-motion`. The CTA is a swappable Cal.com popup.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, next/font, `@calcom/embed-react`, Playwright.

**Reference spec:** `docs/superpowers/specs/2026-07-08-dusttemple-homepage-redesign-design.md`

**Testing strategy (read once):** This is a presentational site. We verify with three tools, not unit tests per element:
1. `npx tsc --noEmit` and `npm run build` — hard gates every task ends on.
2. Playwright e2e (`e2e/*.spec.ts`) — for *behavior*: menu toggle, accordions, Cal.com trigger, reduced-motion, key content present. Written test-first for interactive tasks.
3. Manual visual check in the browser for pure layout/aesthetics.

---

## File structure

```
app/
  layout.tsx            Root layout: fonts, <html> font vars, metadata, skip-link
  page.tsx              Homepage: composes sections in order
  globals.css           Tailwind import, @theme tokens, shadcn vars, base styles
components/
  brand/logo.tsx        Inline-styled logo (mark + wordmark)
  layout/
    site-header.tsx     Sticky nav + mobile menu
    site-footer.tsx     Footer
  sections/
    hero.tsx
    meet-manisha.tsx
    who-is-this-for.tsx
    services.tsx
    how-it-works.tsx
    testimonials.tsx
    faq.tsx
    closing-cta.tsx
  booking/booking-button.tsx   Cal.com popup trigger (swappable)
  motion/
    reveal.tsx          IntersectionObserver fade-up wrapper
    dust-field.tsx      Canvas particle hero background
    constellation.tsx   SVG stroke-draw celestial motif
  ui/                   shadcn primitives (button, accordion, sheet, ...)
content/
  site.ts               Nav, socials, brand copy constants, cal link
  outcomes.ts           6 "who is this for" themes
  services.ts           7 services grouped (Cosmic/Connection/Practice)
  testimonials.ts       Named client quotes
  faq.ts                Q&A items
lib/utils.ts            cn() helper (from shadcn)
e2e/                    Playwright specs
public/brand/           Logo assets
public/images/          Curated on-palette imagery
```

Types (`Outcome`, `Service`, `ServiceGroup`, `Testimonial`, `FaqItem`, `NavItem`, `SocialLink`) are defined in Task 6 and imported by name everywhere else.

---

## Phase 0 — Scaffold & tooling

### Task 1: Initialize the Next.js app

**Files:**
- Create: project files via scaffolder (`package.json`, `tsconfig.json`, `next.config.ts`, `app/`, `postcss.config.mjs`, `app/globals.css`)

- [ ] **Step 1: Scaffold into the existing repo**

The repo already exists (git history + `docs/` + `assets/`). Scaffold into the current directory, keeping existing files.

Run:
```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
```
When prompted "directory not empty / files may be overwritten", allow it; if it refuses, scaffold into `.tmp-app` and move files in:
```bash
npx create-next-app@latest .tmp-app --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
cp -r .tmp-app/. . && rm -rf .tmp-app
```

- [ ] **Step 2: Verify dev server boots**

Run:
```bash
npm run dev
```
Expected: server ready at `http://localhost:3000`; visiting it renders the default Next page. Stop it with Ctrl-C.

- [ ] **Step 3: Verify production build**

Run: `npm run build`
Expected: build completes with no type or lint errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app (TS, Tailwind v4, App Router)"
```

---

### Task 2: Install and theme shadcn/ui

**Files:**
- Create: `components.json`, `lib/utils.ts`, `components/ui/*`
- Modify: `app/globals.css`

- [ ] **Step 1: Init shadcn**

Run:
```bash
npx shadcn@latest init -d
```
Choose defaults; base color "neutral" (we override with brand tokens next). This creates `components.json`, `lib/utils.ts`, and wires `app/globals.css`.

- [ ] **Step 2: Add the primitives we need**

Run:
```bash
npx shadcn@latest add button accordion sheet
```
Expected: files appear under `components/ui/`.

- [ ] **Step 3: Verify build still passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add shadcn/ui (button, accordion, sheet)"
```

---

### Task 3: Load the three brand fonts

**Files:**
- Create: `app/fonts.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Define fonts with next/font**

Create `app/fonts.ts`:
```ts
import { Fraunces, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});
```

- [ ] **Step 2: Attach font variables to `<html>`**

Replace `app/layout.tsx` with:
```tsx
import type { Metadata } from "next";
import { fraunces, hanken, plexMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dustt Temple — Find your balance, embrace your peace",
  description:
    "Personal spiritual guidance with Manisha — numerology, astrology, mediumship, and more. Online and in person.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper text-ink font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS (fonts fetched and self-hosted at build). `bg-paper`/`font-body` classes won't resolve until Task 4 — that's fine, build still passes.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: load Fraunces, Hanken Grotesk, IBM Plex Mono via next/font"
```

---

### Task 4: Define design tokens

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Write the token layer**

Replace the contents of `app/globals.css` with:
```css
@import "tailwindcss";

@theme {
  --color-paper: #efebe0;
  --color-paper-alt: #e6e1d3;
  --color-ink: #1e232b;
  --color-teal: #2e93ac;
  --color-teal-deep: #1f6e82;
  --color-brass: #a98842;
  --color-quiet: #797262;
  --color-sage: #9daaa0;

  --font-display: var(--font-fraunces);
  --font-body: var(--font-hanken);
  --font-mono: var(--font-plex-mono);
}

:root {
  --background: var(--color-paper);
  --foreground: var(--color-ink);
  --primary: var(--color-teal-deep);
  --primary-foreground: var(--color-paper);
  --border: color-mix(in srgb, var(--color-ink) 12%, transparent);
  --ring: var(--color-teal);
  --radius: 0.625rem;
}

@layer base {
  * {
    border-color: var(--border);
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    line-height: 1.75;
    text-rendering: optimizeLegibility;
  }
  h1, h2, h3 {
    font-family: var(--font-display);
    text-wrap: balance;
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }
  ::selection {
    background: color-mix(in srgb, var(--color-teal) 30%, transparent);
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
  }
}
```

- [ ] **Step 2: Add a token smoke test page usage**

Temporarily edit `app/page.tsx` to:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-paper p-16">
      <h1 className="font-display text-6xl text-ink">Dustt Temple</h1>
      <p className="mt-4 font-body text-quiet">Warm oat, ocean teal, antique brass.</p>
      <p className="mt-2 font-mono text-teal-deep">11 · 22 · master numbers</p>
    </main>
  );
}
```

- [ ] **Step 3: Verify tokens render**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: warm off-white page, Fraunces heading, Hanken body, mono line in deep teal. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: brand design tokens (color, type) via Tailwind @theme"
```

---

### Task 5: Set up Playwright

**Files:**
- Create: `playwright.config.ts`, `e2e/smoke.spec.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Install Playwright**

Run:
```bash
npm i -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Config**

Create `playwright.config.ts`:
```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
```

- [ ] **Step 3: Write the smoke test (failing first)**

Create `e2e/smoke.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test("homepage renders the brand name", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /dustt temple/i })).toBeVisible();
});
```

- [ ] **Step 4: Add script and run**

In `package.json` add to `"scripts"`: `"test:e2e": "playwright test"`.
Run: `npm run test:e2e`
Expected: PASS (the Task 4 smoke page shows "Dustt Temple").

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: add Playwright with homepage smoke test"
```

---

## Phase 1 — Content model & shared building blocks

### Task 6: Content model

**Files:**
- Create: `content/site.ts`, `content/outcomes.ts`, `content/services.ts`, `content/testimonials.ts`, `content/faq.ts`

> Copy below is the rewritten, calm, non-transactional voice. Testimonial text is from the prototype (pending client confirmation — see spec §11). No pricing anywhere.

- [ ] **Step 1: Site constants and nav**

Create `content/site.ts`:
```ts
export type NavItem = { label: string; href: string };
export type SocialLink = { label: string; href: string; icon: "facebook" | "instagram" | "youtube" };

export const site = {
  name: "Dustt Temple",
  tagline: "Find your balance, embrace your peace.",
  calLink: "manishaa-motarwar-zwznrp/30min",
  ctaLabel: "Begin a conversation",
  practitioner: "Manisha Motarwar",
} as const;

export const nav: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const socials: SocialLink[] = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
];
```

- [ ] **Step 2: Outcomes ("Who is this for")**

Create `content/outcomes.ts`:
```ts
export type Outcome = { title: string; body: string };

export const outcomes: Outcome[] = [
  { title: "Emotional well-being", body: "Release what you have been carrying, soften anxiety, and find a steadier kind of calm." },
  { title: "Physical health", body: "Support your body's own recovery and vitality by tending to the energy behind it." },
  { title: "Relationships", body: "Understand the patterns beneath your closest bonds, and meet them with more clarity." },
  { title: "Spiritual development", body: "Deepen your practice, trust your intuition, and grow more aware of the unseen." },
  { title: "Personal growth", body: "Uncover the beliefs quietly shaping your choices, and align with what is true for you." },
  { title: "Solace and clarity", body: "Find comfort in difficult seasons, and a little more light on the path ahead." },
];
```

- [ ] **Step 3: Services (grouped)**

Create `content/services.ts`:
```ts
export type Service = { name: string; blurb: string; offerings: string[] };
export type ServiceGroup = { group: string; caption: string; services: Service[] };

export const serviceGroups: ServiceGroup[] = [
  {
    group: "Cosmic",
    caption: "The map you were born with.",
    services: [
      {
        name: "Numerology",
        blurb: "The numbers that shape your personality, timing, and path.",
        offerings: ["Life path analysis", "Predictive insights", "Compatibility insights", "Readings tailored to you"],
      },
      {
        name: "Astrology",
        blurb: "Your birth chart, read for who you are and what is unfolding.",
        offerings: ["Birth chart analysis", "Relationship astrology", "Predictive astrology", "Timing for big decisions"],
      },
    ],
  },
  {
    group: "Connection",
    caption: "For comfort, closure, and what lies beyond the seen.",
    services: [
      {
        name: "Mediumship",
        blurb: "Tender sessions to connect with loved ones who have passed.",
        offerings: ["Personalized sessions", "Guidance and healing", "Emotional support", "A safe, compassionate space"],
      },
      {
        name: "Akashic record reading",
        blurb: "Insight into your soul's journey and life purpose.",
        offerings: ["Soul path discovery", "Life guidance", "Energetic healing", "Connection to higher wisdom"],
      },
      {
        name: "Angel card reading",
        blurb: "Gentle messages drawn for your current questions.",
        offerings: ["Personalized readings", "Clarity and support", "Comfort and reassurance", "Guidance for growth"],
      },
      {
        name: "Aura reading",
        blurb: "A look at your energy field and where it seeks balance.",
        offerings: ["Energy field analysis", "Identifying imbalances", "Healing and harmony", "Deeper self-awareness"],
      },
    ],
  },
  {
    group: "Practice",
    caption: "Everyday tools for a calmer life.",
    services: [
      {
        name: "Mindfulness & happiness coaching",
        blurb: "Practical guidance toward a more grounded, joyful day-to-day.",
        offerings: ["Personalized coaching", "Stress-reduction techniques", "Emotional resilience", "A positive, self-aware mindset"],
      },
    ],
  },
];
```

- [ ] **Step 4: Testimonials**

Create `content/testimonials.ts`:
```ts
export type Testimonial = { quote: string; name: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "Manisha, one person amongst a lot of healers I have known in my own journey. A soul so simple and warm, willing to work with you to make a change in your life. Someone you can connect with at all times, like a strong pillar.",
    name: "Vikramjit Singh Chugh",
  },
  {
    quote:
      "Manisha taught me how to look at things from a different perspective. After many conversations and sessions, I have started to view life in a more positive way, and learnt about the beauty of forgiveness and gratitude.",
    name: "Varsha Koppikar",
  },
  {
    quote:
      "I have known Manisha for a few years now. She is patient, kind, sensitive, and has clarity of thought. Her ability to connect the dots and see what lies ahead has been spot on. I highly recommend her to anyone seeking peace and harmony.",
    name: "Vikaas Sachdev",
  },
];
```

- [ ] **Step 5: FAQ**

Create `content/faq.ts`:
```ts
export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  { q: "Are sessions in person or online?", a: "Both. We meet whichever way feels most comfortable for you." },
  { q: "Who are these sessions for?", a: "Anyone. There is no criteria — only a willingness to show up for yourself." },
  { q: "What happens in a first session?", a: "We simply talk. You share what brought you here, and together we find where to begin. There is no pressure and nothing you need to prepare." },
  { q: "How should I prepare?", a: "Come as you are. If a particular question or person is on your mind, hold it gently — the rest unfolds in conversation." },
];
```

- [ ] **Step 6: Typecheck and commit**

Run: `npx tsc --noEmit`
Expected: PASS.
```bash
git add -A
git commit -m "feat: typed content model (site, outcomes, services, testimonials, faq)"
```

---

### Task 7: Logo component

**Files:**
- Create: `components/brand/logo.tsx`, `public/brand/dustt-temple-logo.avif`, `public/brand/dustt-temple-logo.png`

- [ ] **Step 1: Move brand assets into `public/`**

Run:
```bash
mkdir -p public/brand
cp assets/brand/dustt-temple-logo.avif public/brand/
cp assets/brand/dustt-temple-logo.png public/brand/
```

- [ ] **Step 2: Logo component**

Create `components/brand/logo.tsx`:
```tsx
import Image from "next/image";
import { site } from "@/content/site";

export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/dustt-temple-logo.png"
      alt={`${site.name} logo`}
      width={636}
      height={377}
      priority={priority}
      className={className}
    />
  );
}
```

- [ ] **Step 3: Typecheck and commit**

Run: `npx tsc --noEmit`
Expected: PASS.
```bash
git add -A
git commit -m "feat: logo component + public brand assets"
```

---

### Task 8: Motion primitives

**Files:**
- Create: `components/motion/reveal.tsx`, `components/motion/dust-field.tsx`, `components/motion/constellation.tsx`

- [ ] **Step 1: Reveal (fade-up on scroll)**

Create `components/motion/reveal.tsx`:
```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(16px)",
        transition: `opacity 600ms ease, transform 600ms ease`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Comp>
  );
}
```

- [ ] **Step 2: DustField (Canvas)**

Create `components/motion/dust-field.tsx`:
```tsx
"use client";
import { useEffect, useRef } from "react";

export function DustField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let parts: { x: number; y: number; r: number; s: number; sway: number; amp: number; a: number; warm: boolean }[] = [];

    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(140, Math.floor(w / 10));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4, s: Math.random() * 0.24 + 0.05,
        sway: Math.random() * Math.PI * 2, amp: Math.random() * 0.5 + 0.2,
        a: Math.random() * 0.45 + 0.12, warm: Math.random() > 0.45,
      }));
    };

    const draw = () => {
      const h = canvas.clientHeight, w = canvas.clientWidth;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.y -= p.s; p.sway += 0.01; p.x += Math.sin(p.sway) * p.amp * 0.35;
        if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.fillStyle = p.warm ? `rgba(169,136,66,${p.a})` : `rgba(46,147,172,${p.a * 0.7})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    size(); draw();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(size, 150); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
```

- [ ] **Step 3: Constellation (SVG draw-in)**

Create `components/motion/constellation.tsx`:
```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function Constellation({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [draw, setDraw] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setDraw(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDraw(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lineStyle = {
    strokeDasharray: 1200,
    strokeDashoffset: draw ? 0 : 1200,
    transition: "stroke-dashoffset 2400ms ease",
  } as const;

  return (
    <svg ref={ref} viewBox="0 0 400 400" fill="none" aria-hidden="true" className={className}>
      <g stroke="var(--color-teal)" strokeWidth="1" style={lineStyle}>
        <path d="M60 90 L130 140 L120 220 L200 250 L280 200 L330 260" />
        <path d="M130 140 L190 110 L280 130 L330 90" />
      </g>
      <g fill="var(--color-brass)">
        {[[60,90,3.5],[130,140,4.5],[190,110,3],[280,130,4],[330,90,3],[120,220,3.5],[200,250,5],[280,200,3.5],[330,260,3]].map(([cx,cy,r],i)=>(
          <circle key={i} cx={cx} cy={cy} r={r} style={{ opacity: draw ? 1 : 0, transition: `opacity 800ms ease ${400 + i*120}ms` }} />
        ))}
      </g>
      <circle cx="200" cy="200" r="150" stroke="var(--color-brass)" strokeWidth="0.6" opacity="0.3" />
    </svg>
  );
}
```

- [ ] **Step 4: Typecheck and commit**

Run: `npx tsc --noEmit`
Expected: PASS.
```bash
git add -A
git commit -m "feat: calm motion primitives (reveal, dust field, constellation)"
```

---

### Task 9: Booking button (Cal.com)

**Files:**
- Create: `components/booking/booking-button.tsx`
- Test: `e2e/booking.spec.ts`

- [ ] **Step 1: Install the embed**

Run: `npm i @calcom/embed-react`

- [ ] **Step 2: Write the failing behavior test**

Create `e2e/booking.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test("primary booking button is present and labelled", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("button", { name: /begin a conversation/i }).first();
  await expect(cta).toBeVisible();
});
```
Run: `npm run test:e2e -- booking`
Expected: FAIL (no such button yet).

- [ ] **Step 3: Implement the swappable booking button**

Create `components/booking/booking-button.tsx`:
```tsx
"use client";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export function BookingButton({
  className = "",
  label = site.ctaLabel,
  variant = "solid",
}: {
  className?: string;
  label?: string;
  variant?: "solid" | "ghost";
}) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-link={site.calLink}
      data-cal-config='{"layout":"month_view"}'
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] transition-colors",
        variant === "solid"
          ? "bg-teal-deep text-paper hover:bg-teal"
          : "text-teal-deep hover:text-teal",
        className
      )}
    >
      {label}
      <span aria-hidden="true">→</span>
    </button>
  );
}
```

- [ ] **Step 4: Temporarily mount it to make the test pass**

In `app/page.tsx`, add the import `import { BookingButton } from "@/components/booking/booking-button";` and render `<BookingButton />` inside `<main>`.
Run: `npm run test:e2e -- booking`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Cal.com booking button (swappable, non-transactional CTA)"
```

---

## Phase 2 — Layout & sections

> Each section is a server component reading typed content, wrapped in `Reveal` for calm entrance. Sections use semantic landmarks and the `id`s referenced by nav (`#services`, `#about`, `#testimonials`, `#faq`).

### Task 10: Site header (sticky nav + mobile menu)

**Files:**
- Create: `components/layout/site-header.tsx`
- Test: `e2e/nav.spec.ts`

- [ ] **Step 1: Failing test for the mobile menu**

Create `e2e/nav.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test("mobile menu opens and shows nav links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: /open menu/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("link", { name: /services/i })).toBeVisible();
});
```
Run: `npm run test:e2e -- nav`
Expected: FAIL.

- [ ] **Step 2: Implement the header**

Create `components/layout/site-header.tsx`:
```tsx
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
            <SheetContent side="right" className="bg-paper">
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
```

- [ ] **Step 3: Mount header, run test**

In `app/page.tsx` add `<SiteHeader />` above `<main>` (import it). Run: `npm run test:e2e -- nav`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: sticky site header with mobile sheet menu"
```

---

### Task 11: Hero

**Files:**
- Create: `components/sections/hero.tsx`

- [ ] **Step 1: Implement the hero**

Create `components/sections/hero.tsx`:
```tsx
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
          We come from dust. In between, we build a temple.
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
```

- [ ] **Step 2: Visual check**

Run `npm run dev`, confirm drifting dust, headline in Fraunces, warm glow. Stop server.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: hero section with dust field"
```

---

### Task 12: Meet Manisha (voice-led)

**Files:**
- Create: `components/sections/meet-manisha.tsx`

- [ ] **Step 1: Implement**

Create `components/sections/meet-manisha.tsx`:
```tsx
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
```

- [ ] **Step 2: Visual check + commit**

Run `npm run dev`, confirm the constellation draws in on scroll. Then:
```bash
git add -A
git commit -m "feat: voice-led Meet Manisha section (portrait deferred)"
```

---

### Task 13: Who is this for

**Files:**
- Create: `components/sections/who-is-this-for.tsx`

- [ ] **Step 1: Implement**

Create `components/sections/who-is-this-for.tsx`:
```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: who-is-this-for outcomes grid"
```

---

### Task 14: Services (grouped, with expandable offerings)

**Files:**
- Create: `components/sections/services.tsx`
- Test: `e2e/services.spec.ts`

- [ ] **Step 1: Failing test for expandable offerings**

Create `e2e/services.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test("a service can be expanded to reveal its offerings", async ({ page }) => {
  await page.goto("/#services");
  const trigger = page.getByRole("button", { name: /numerology/i }).first();
  await trigger.click();
  await expect(page.getByText(/life path analysis/i)).toBeVisible();
});
```
Run: `npm run test:e2e -- services`
Expected: FAIL.

- [ ] **Step 2: Implement with shadcn Accordion**

Create `components/sections/services.tsx`:
```tsx
import { Reveal } from "@/components/motion/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceGroups } from "@/content/services";

export function Services() {
  return (
    <section id="services" className="border-y border-ink/10 bg-paper-alt">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">What I offer</p>
          <h2 className="mt-5 text-4xl text-ink md:text-5xl">Ways we can work together.</h2>
        </Reveal>

        <div className="mt-16 space-y-16">
          {serviceGroups.map((grp) => (
            <Reveal key={grp.group}>
              <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                <div>
                  <h3 className="font-display text-2xl text-teal-deep">{grp.group}</h3>
                  <p className="mt-2 text-sm text-quiet">{grp.caption}</p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {grp.services.map((s) => (
                    <AccordionItem key={s.name} value={s.name} className="border-ink/10">
                      <AccordionTrigger className="text-left">
                        <span className="text-lg text-ink">{s.name}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-quiet">{s.blurb}</p>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {s.offerings.map((o) => (
                            <li key={o} className="flex items-start gap-2 text-sm text-ink/80">
                              <span aria-hidden="true" className="mt-1 text-brass">✦</span>
                              {o}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run test**

Run: `npm run test:e2e -- services`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: grouped services with expandable offerings"
```

---

### Task 15: How a session works

**Files:**
- Create: `components/sections/how-it-works.tsx`

- [ ] **Step 1: Implement**

Create `components/sections/how-it-works.tsx`:
```tsx
import { Reveal } from "@/components/motion/reveal";

const steps = [
  { k: "01", title: "Reach out", body: "Pick a time that suits you. No forms of intent to fill in, no pressure — just a first hello." },
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
```

> Note: `01/02/03` numbering is used deliberately here — this section *is* a real sequence.

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: how-a-session-works steps"
```

---

### Task 16: Testimonials

**Files:**
- Create: `components/sections/testimonials.tsx`
- Test: `e2e/testimonials.spec.ts`

- [ ] **Step 1: Failing test for carousel advance**

Create `e2e/testimonials.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test("testimonials advance to the next quote", async ({ page }) => {
  await page.goto("/#testimonials");
  await expect(page.getByText(/vikramjit singh chugh/i)).toBeVisible();
  await page.getByRole("button", { name: /next testimonial/i }).click();
  await expect(page.getByText(/varsha koppikar/i)).toBeVisible();
});
```
Run: `npm run test:e2e -- testimonials`
Expected: FAIL.

- [ ] **Step 2: Implement a calm client carousel**

Create `components/sections/testimonials.tsx`:
```tsx
"use client";
import { useState } from "react";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (d: number) => setI((p) => (p + d + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="border-y border-ink/10 bg-paper-alt">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center md:px-8 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">Kind words</p>
        <blockquote className="mt-8">
          <p className="font-display text-2xl leading-snug text-ink md:text-3xl">“{t.quote}”</p>
          <footer className="mt-8 font-mono text-sm uppercase tracking-[0.14em] text-teal-deep">{t.name}</footer>
        </blockquote>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className="rounded-full border border-ink/20 p-2 text-ink transition-colors hover:border-teal">
            <Arrow dir="left" />
          </button>
          <div className="flex gap-2" aria-hidden="true">
            {testimonials.map((_, k) => (
              <span key={k} className={`h-1.5 w-1.5 rounded-full ${k === i ? "bg-teal-deep" : "bg-ink/20"}`} />
            ))}
          </div>
          <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className="rounded-full border border-ink/20 p-2 text-ink transition-colors hover:border-teal">
            <Arrow dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"
      style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 3: Run test**

Run: `npm run test:e2e -- testimonials`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: testimonials carousel"
```

---

### Task 17: FAQ

**Files:**
- Create: `components/sections/faq.tsx`

- [ ] **Step 1: Implement with shadcn Accordion**

Create `components/sections/faq.tsx`:
```tsx
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
      <Accordion type="single" collapsible className="mt-10 w-full">
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
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: FAQ accordion"
```

---

### Task 18: Closing CTA

**Files:**
- Create: `components/sections/closing-cta.tsx`

- [ ] **Step 1: Implement**

Create `components/sections/closing-cta.tsx`:
```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: closing CTA band"
```

---

### Task 19: Site footer

**Files:**
- Create: `components/layout/site-footer.tsx`

- [ ] **Step 1: Implement**

Create `components/layout/site-footer.tsx`:
```tsx
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
              <Link key={n.label} href={n.href} className="text-sm text-ink/80 hover:text-teal-deep">{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-quiet">Follow along</span>
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="text-ink/70 transition-colors hover:text-teal-deep">
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
  const paths: Record<string, JSX.Element> = {
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
```

> Blog link is a graceful stub (`#`) — out of scope this milestone (spec §10).

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: site footer"
```

---

### Task 20: Compose the homepage + SEO

**Files:**
- Modify: `app/page.tsx`, `app/layout.tsx`

- [ ] **Step 1: Assemble the page**

Replace `app/page.tsx` with:
```tsx
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { MeetManisha } from "@/components/sections/meet-manisha";
import { WhoIsThisFor } from "@/components/sections/who-is-this-for";
import { Services } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <MeetManisha />
        <WhoIsThisFor />
        <Services />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Add richer metadata**

In `app/layout.tsx`, extend the `metadata` export:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://dusttemple.com"),
  title: "Dustt Temple — Find your balance, embrace your peace",
  description:
    "Personal spiritual guidance with Manisha Motarwar — numerology, astrology, mediumship, akashic readings, and more. Online and in person.",
  openGraph: {
    title: "Dustt Temple",
    description: "Find your balance, embrace your peace.",
    type: "website",
  },
};
```

- [ ] **Step 3: Full build + all e2e**

Run: `npm run build && npm run test:e2e`
Expected: build PASS; all specs (smoke, booking, nav, services, testimonials) PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: compose homepage and metadata"
```

---

## Phase 3 — Quality & ship

### Task 21: Responsive + accessibility pass

**Files:**
- Test: `e2e/a11y.spec.ts`
- Modify: any section needing fixes

- [ ] **Step 1: Reduced-motion + landmark test**

Create `e2e/a11y.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test("respects reduced motion (no canvas animation errors, content visible)", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await ctx.close();
});

test("has a single h1 and a main landmark", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main#main")).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
});

test("skip link is reachable", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: /skip to content/i })).toBeFocused();
});
```
Run: `npm run test:e2e -- a11y`
Expected: PASS (fix any failures — e.g. duplicate h1, missing focus).

- [ ] **Step 2: Manual responsive sweep**

Run `npm run dev`, check at 390px, 768px, 1280px: no horizontal scroll, hero legible, services readable, footer stacks. Fix spacing issues inline.

- [ ] **Step 3: Verify focus states**

Tab through header, booking button, accordions, carousel arrows — every interactive element shows a visible focus ring (shadcn provides `--ring`; add `focus-visible:ring-2 focus-visible:ring-teal` to custom buttons if missing).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "test: accessibility + responsive pass"
```

---

### Task 22: Deploy to Vercel

**Files:**
- Create: `README.md` (project section), `.nvmrc` (optional)

- [ ] **Step 1: Final production build locally**

Run: `npm run build`
Expected: PASS, no warnings that block deploy.

- [ ] **Step 2: Update README**

Add a project section to `README.md`:
```markdown
## Dustt Temple website

Next.js 15 + Tailwind v4 + shadcn/ui. Calm, non-transactional homepage for Manisha Motarwar's practice.

- `npm run dev` — local dev
- `npm run build` — production build
- `npm run test:e2e` — Playwright behavior tests

Design spec: `docs/superpowers/specs/2026-07-08-dusttemple-homepage-redesign-design.md`
Booking: Cal.com (`manishaa-motarwar-zwznrp/30min`), swappable in `components/booking/booking-button.tsx`.
```

- [ ] **Step 3: Push branch and open PR**

Run:
```bash
git add -A && git commit -m "docs: project README"
git push -u origin redesign/homepage
```
Then open a PR to `main` (via `gh pr create` or GitHub UI). Import the repo into Vercel (framework auto-detected as Next.js); deploy the branch as a preview, then promote to production on merge. Configure the custom domain in Vercel when available.

- [ ] **Step 4: Verify the Vercel preview**

Open the Vercel preview URL. Confirm: fonts load, dust animates, Cal.com popup opens on the CTA, all sections render, mobile menu works.

---

## Self-review

**Spec coverage:**
- Design system (color/type/motion/layout) → Tasks 3, 4, 8. ✔
- Imagery unification → curated `public/images/` + on-palette SVG motifs (Constellation/DustField); real imagery is a content drop, not code. ✔ (photography sourcing tracked in spec §11)
- Homepage IA §6 sections 1–10 → Tasks 10–19. ✔
- Non-transactional copy, no pricing → content model (Task 6), CTA label "Begin a conversation", closing "no cost to simply talk". ✔
- Cal.com booking, swappable → Task 9. ✔
- Calm motion, reduced-motion-safe → Task 8 + Task 21. ✔
- Portrait deferred → Task 12 voice-led. ✔
- Blog deferred/stubbed → Task 19 footer. ✔
- Tech stack Next/Tailwind/shadcn, Vercel → Tasks 1, 2, 22. ✔

**Placeholder scan:** No TBD/TODO; every code step has complete code. Social `href`s are `#` pending real URLs (client input, spec §11) — intentional, noted.

**Type consistency:** `Outcome`, `Service`, `ServiceGroup`, `Testimonial`, `FaqItem`, `NavItem`, `SocialLink` defined in Task 6 and imported unchanged. `BookingButton` props (`className`, `label`, `variant`) consistent across Tasks 9–19. `site.calLink` / `site.ctaLabel` used consistently.

**Known follow-ups (post-milestone, from spec §10–11):** real testimonial sign-off, credentials/trust copy, curated photography, Manisha portrait, Blog, inner pages, domain.
