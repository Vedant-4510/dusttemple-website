# Blog Section — Design Spec

Date: 2026-09-25

## Goal

Add a Blog section to the Dustt Temple website. This is the first of an ongoing series of posts on various topics, so the design must make publishing future posts trivial (no code changes per post). The section must match the site's existing visual and voice conventions exactly.

## Routes

- `/blog` — listing page. Shows all posts as cards (title, date, excerpt), newest first.
- `/blog/[slug]` — single post page. Renders the full post body.

Both are new top-level routes under `app/`; the site currently has no nested route folders (everything lives on `app/page.tsx`), so this is the first route segment added.

## Content authoring

Posts are authored as MDX files with frontmatter, not as TSX or entries in a shared `content/*.ts` array (the pattern used for testimonials/FAQ/services). This is a deliberate departure from those files because blog posts are long-form prose authored by non-developers over time; MDX + frontmatter lets a new post be published by adding a single file with no code changes.

- Location: `content/blog/<slug>.mdx`
- Frontmatter fields: `title` (string), `date` (ISO string, e.g. `2026-09-25`), `excerpt` (string, ~1-2 sentences for the listing card).
- Slug = filename without extension, used directly in the `/blog/[slug]` URL.
- Body: MDX (markdown + optional embedded components later, none needed for the first post).

### Packages needed

- `gray-matter` — parses frontmatter out of the `.mdx` file.
- `next-mdx-remote` — compiles/renders the MDX body as a React Server Component (`next-mdx-remote/rsc`).

## Implementation

### `lib/blog.ts`

- `getAllPosts(): PostMeta[]` — reads all files in `content/blog/`, parses frontmatter via `gray-matter`, returns `{ slug, title, date, excerpt }[]` sorted by `date` descending.
- `getPostBySlug(slug: string): { meta: PostMeta; content: string }` — reads and parses the single matching file (frontmatter + raw MDX body string, to be passed to `<MDXRemote>`).

### `app/blog/page.tsx`

- Server component. Calls `getAllPosts()`.
- Structure matches other sections: eyebrow label (`font-mono text-xs uppercase tracking-[0.24em] text-teal-deep`), `h1` in `font-display` sized like other section headings, then a grid/stack of post cards.
- Each card: `rounded-2xl border border-ink/10 bg-paper-alt/40 hover:bg-paper/80` (same treatment as existing cards elsewhere on the site), showing title (`font-display`), formatted date (`font-mono text-xs text-quiet`), excerpt (`font-body text-quiet`), linking to `/blog/[slug]`.
- Wrapped in `Reveal` for scroll-in animation, consistent with other sections.
- Container rhythm: `mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32` (or `max-w-6xl` if a multi-column card grid reads better — decide at implementation time based on post count; with one post a single column is fine).

### `app/blog/[slug]/page.tsx`

- Server component. Calls `getPostBySlug(params.slug)`; 404s via `notFound()` if missing.
- `generateStaticParams()` from `getAllPosts()` slugs.
- `generateMetadata()` sets page title/OG description from the post's `title`/`excerpt`.
- Renders: eyebrow ("Blog" or similar), `h1` title (Fraunces), date, then `<MDXRemote source={content} components={mdxComponents} />`.
- `mdxComponents` maps markdown elements to site typography: `h2`/`h3` → `font-display` headings sized appropriately smaller than the page `h1`; `p` → `font-body text-ink/90` with comfortable line-height and max-width for readability (e.g. `max-w-2xl` prose column); `blockquote`/`em`-heavy lines (the post uses italics for emphasis) → styled with `text-brass` or `text-teal-deep` per existing accent usage; `strong` → `font-semibold`.
- Bottom of post: a simple "← Back to Blog" link.

### Nav & footer wiring

- `content/site.ts`: add `{ label: "Blog", href: "/blog" }` to the `nav` array. This automatically appears in both desktop nav and the mobile `Sheet` menu since both read from this array.
- `components/layout/site-footer.tsx`: update the existing stub footer entry from `{ label: "Blog", href: "#" }` to `{ label: "Blog", href: "/blog" }`. No other footer changes needed.

## First post content

Source: user-provided essay "Anxiety Is a Terrible Fortune Teller."

The user's pasted source contains the full essay twice — a cleanly formatted version with markdown emphasis (`*italics*`), followed by a near-duplicate re-transcription of the same content with different line breaks and slightly different emphasis placement. Only the first, cleaner version is used as the canonical post body; the duplicate is dropped.

Frontmatter for this post:
- `title`: "Anxiety Is a Terrible Fortune Teller"
- `date`: 2026-09-25 (publish date — confirm with user if a different date is intended)
- `excerpt`: "What if the future you're afraid of is not the future that is actually coming? On learning not to believe every prediction anxiety's mind makes."

## Styling constraints (no new design tokens)

Reuse existing tokens exactly, no additions:
- Backgrounds: `bg-paper`, `bg-paper-alt`
- Text: `text-ink`, `text-quiet`, accents `text-teal-deep`, `text-brass`
- Fonts: `font-display` (Fraunces, headings), `font-body` (Hanken, prose), `font-mono` (Plex Mono, eyebrow/date labels)
- Card/border treatment: `rounded-2xl border border-ink/10`
- Motion: `components/motion/reveal.tsx` `Reveal` wrapper for scroll-in, consistent with rest of site

## Testing plan

- `npm run lint` passes.
- Dev server: `/blog` renders the listing with the one post; `/blog/anxiety-is-a-terrible-fortune-teller` renders the full post correctly (headings, emphasis, paragraphs all styled, no raw markdown leaking through).
- Nav: "Blog" link appears in desktop header and mobile sheet menu, navigates to `/blog`.
- Footer: "Blog" link now points to `/blog` instead of `#`.
- Existing Playwright e2e suite (`e2e/`) still passes — confirm no regressions on the homepage from the nav/footer content changes.

## Out of scope

- CMS/admin UI for authoring posts (posts are hand-authored `.mdx` files for now).
- Tags/categories filtering on the listing page (single post today; revisit if the list grows).
- Comments, related-posts, or social share buttons.
