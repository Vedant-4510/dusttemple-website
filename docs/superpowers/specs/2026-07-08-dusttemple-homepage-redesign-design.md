# Dustt Temple — Homepage Redesign Design Spec

**Date:** 2026-07-08
**Status:** Draft for review
**Scope:** Homepage (first milestone). Full-site pages and Blog are out of scope for this milestone.

---

## 1. Overview

Dustt Temple is the personal spiritual practice of **Manisha**, a healer offering
consultation-based guidance across seven modalities (numerology, astrology, mediumship,
akashic record reading, mindfulness & happiness coaching, angel card reading, aura reading).

We are moving off a Framer prototype into a maintained Next.js codebase and redesigning the
homepage. The redesign fixes the prototype's core weaknesses — inconsistent imagery, a generic
"stock wellness" look, and a hidden practitioner — while making the site feel **calm, personal,
and trustworthy rather than transactional**.

### The one job of the homepage
Make a first-time visitor feel calm, understood, and safe enough to **reach out** — via a single,
recurring, low-pressure call to action. Not to sell. Not to quote prices. To build trust and
invite a conversation.

---

## 2. Audience

- Adults in transition — dealing with grief, anxiety, relationship strain, big decisions, or a
  search for meaning.
- Wellness-curious; value ancient wisdom made accessible and warm, not clinical.
- Skews India / diaspora with a global online reach (sessions are offered online and in person).
- They are choosing a **person** to trust with something vulnerable — so warmth and human voice
  matter more than feature lists.

---

## 3. Brand foundation

- **Name:** Dustt Temple.
- **Core metaphor (the soul of the brand):** *"We come from dust and return to it. In between, we
  build a temple — not of stone, but of our thoughts, actions, and expectations."* The temple is
  the self. This idea anchors the voice and the hero.
- **Promise / tagline:** "Find your balance, embrace your peace."
- **Voice:** warm, personal, first-person (Manisha speaking), unhurried, non-salesy. Reassuring,
  never clinical or performatively mystical.

---

## 4. Design direction — "Ephemeris, stilled"

Chosen from three explored directions (see `scratchpad/moodboard.html`). The base is **Ephemeris**
— a mystic-astronomer's field-notebook aesthetic that ties directly to Manisha's numerology and
astrology work, keeps the logo's teal, and stays light and warm — **softened toward calm** and
carrying one adapted signature moment from the "Ash & Ember" direction: **golden dust drifting in
soft daylight** (motes in a sunbeam, not smoke in the dark).

**"Calmness personified" is the governing rule**, applied to every decision: color, type, spacing,
motion, and copy.

### 4.1 Color tokens

| Token       | Hex       | Role                                             |
|-------------|-----------|--------------------------------------------------|
| `paper`     | `#EFEBE0` | Primary ground — warm oat, airy                  |
| `paper-alt` | `#E6E1D3` | Quiet section banding                            |
| `ink`       | `#1E232B` | Primary text — iron-gall blue-black (not pure black) |
| `pine`      | `#37564F` | Primary accent (the logo teal, calmed)           |
| `brass`     | `#A98842` | Numerals, stars, fine detail — used sparingly    |
| `muted`     | `#797262` | Secondary text                                   |
| `sage`      | `#9DAAA0` | Soft supporting tint                             |

Neutrals are warm-biased toward the accent, not pure grey. Final tokens live in the Tailwind theme
and as CSS variables; shadcn components are themed to these values.

### 4.2 Typography

| Role     | Typeface        | Use                                                      |
|----------|-----------------|----------------------------------------------------------|
| Display  | Fraunces        | Headlines — soft, literary, optical warmth               |
| Body     | Hanken Grotesk  | Running text and UI — humanist, gentle (deliberately not Inter) |
| Utility  | IBM Plex Mono   | Coordinates, sacred numerals (`11`, `22`), small labels  |

All three are open-licensed and **self-hosted / inlined** in the Next build — no external font CDN.
Body measure stays ~60–66 characters; body line-height ~1.75; headings use `text-wrap: balance`.

### 4.3 Motion

Deliberate and calm — motion serves the experience, never decorates it.

- **Hero:** golden dust motes drift slowly through soft light (Canvas, capped particle count, DPR-aware).
- **Constellation / line art:** draws in once when scrolled into view.
- **Section reveals:** soft, short fade-ups with gentle stagger (~400–600ms).
- **Hover:** small, eased, never springy or bouncy.
- **Optional ambient:** subtle parallax on decorative celestial art.
- `prefers-reduced-motion: reduce` disables all non-essential motion and renders calm static states.

### 4.4 Layout principles

- Generous whitespace; one focal point per section.
- Max content width ~1080–1120px.
- Exactly one accent action per view — the recurring CTA is the calmest-loudest element.
- Hairline pine dividers; brass as punctuation, never wallpaper.
- Recurring "ephemeris" texture — a sparse mono coordinate/numeral motif — as a quiet signature.

---

## 5. Imagery strategy

The prototype's biggest visual failure was inconsistent imagery (cream mandalas + a black Buddha
photo + an AI temple render + stock tarot + a neon chakra graphic). The redesign unifies imagery
into **one curated visual language**, on-palette and matched to intent/messaging:

- Celestial and astronomical line art (constellations, charts, orbits) in pine/brass on paper.
- Sacred geometry and numerology motifs, quiet and consistent.
- Meditative, serene scenes selected/treated to the palette (warm, soft, non-clashing).
- Consistent treatment (duotone / warm wash) so every image reads as one family.

**No portrait of Manisha in this milestone** (asset not available). The "Meet Manisha" section is
voice-led (her words + a signature thematic image), with a portrait slot reserved for a later
enhancement.

---

## 6. Homepage information architecture

Order is deliberate: establish calm and the brand idea, introduce the person, show who it helps,
then what she offers, then how it works, then proof, then answers, then the invitation.

1. **Navigation** — logo · Services · About · Testimonials · FAQ · CTA. Minimal; sticky; solidifies
   gently on scroll. Mobile: calm slide-in menu.
2. **Hero** — the dust-in-daylight moment. Brand headline (from the dust→temple metaphor), warm
   sub-line, primary CTA, one quiet reassurance line (non-numeric, e.g. "online & in person").
3. **Meet Manisha** — voice-led intro: a short paragraph in her voice + name + one qualitative
   descriptor (no metrics), paired with a signature thematic image. Portrait slot reserved.
4. **Who is this for** — the six outcome themes as a calm card grid: Emotional Well-Being, Physical
   Health, Relationships, Spiritual Development, Personal Growth, Solace & Clarity. Reframed gently
   and humanly.
5. **Services** — the seven offerings, grouped for calm scanning:
   - *Cosmic* — Numerology, Astrology
   - *Connection* — Mediumship, Akashic Record Reading, Angel Card Reading, Aura Reading
   - *Practice* — Mindfulness & Happiness Coaching
   Each expandable to its sub-offerings; airy, scannable, never a wall of text.
6. **How a session works** — three calm steps: reach out → we meet (online or in person) → ongoing
   guidance. Lowers friction toward getting in touch.
7. **Testimonials** — real, named client words (from the prototype), warmth foregrounded; calm
   carousel or stacked quotes.
8. **FAQ** — the two existing questions (in-person/online; who can attend) plus a few new drafted
   ones (what a session is like; how to prepare). Calm accordion. **No pricing question.**
9. **Closing CTA band** — "Find your balance. Embrace your peace." → the booking action.
10. **Footer** — logo, tagline, nav (Home · Blog · About), socials (Facebook · Instagram · YouTube),
    copyright. Blog link stubbed gracefully (out of scope this milestone).

---

## 7. Copy

- Full rewrite for warmth and conversion, keeping the dust→temple metaphor as the spine.
- First-person, unhurried, non-salesy. No pricing, no sales metrics, no "buy/purchase" framing.
- CTA wording softened toward invitation — e.g. **"Begin a conversation"** / **"Reach out"** —
  rather than "Set a meeting," while still wired to the booking tool.

---

## 8. Booking (the CTA)

- Every CTA leads to a **Calendly / Cal.com** booking, framed as starting a conversation, not a
  purchase.
- Implementation is swappable behind a single component so the exact tool/link can change without
  touching layout.
- No pricing or payment shown on the site.

---

## 9. Tech

- **Next.js (App Router) + Tailwind CSS + shadcn/ui.**
- Self-hosted inlined fonts; design tokens as Tailwind theme + CSS variables; shadcn themed to the
  palette.
- Static-friendly, SEO-clean, accessible (WCAG AA targets: contrast, keyboard focus, reduced motion).
- Deploy target: Vercel (assumed; confirm).

---

## 10. Out of scope (this milestone)

- Blog / CMS (nav promises one; deferred).
- Individual service / About / Contact pages (homepage-first).
- Manisha portrait photography (later enhancement).
- Any pricing, payment, or e-commerce.

---

## 11. Open items / assets needed from client

- **Logo source file** (vector / high-res) — to derive the exact mark and confirm palette.
- **Booking link** — Calendly or Cal.com URL/account.
- **Final testimonial text** — confirm we may use the named quotes from the prototype.
- **Any real, non-numeric trust signals** we may state (credentials, training, lineage) — nothing
  fabricated.
- Curated/approved imagery, or approval to source on-palette imagery to the strategy in §5.
- Confirm **deploy target** (Vercel assumed) and domain.
