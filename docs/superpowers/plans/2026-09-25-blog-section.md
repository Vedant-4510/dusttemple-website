# Blog Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/blog` listing page and `/blog/[slug]` post pages to the Dustt Temple site, authored as MDX files with frontmatter, wired into the existing nav and footer, matching the site's existing visual language exactly.

**Architecture:** Posts live as `.mdx` files with frontmatter in `content/blog/`. A small `lib/blog.ts` module reads that directory at build/request time (via `fs` + `gray-matter`) to produce post metadata for the listing page and to resolve a single post by slug. `app/blog/page.tsx` lists all posts as cards; `app/blog/[slug]/page.tsx` renders one post's MDX body via `next-mdx-remote/rsc`, mapping markdown elements to the site's existing typography classes. `content/site.ts` and `components/layout/site-footer.tsx` get one new/updated link each.

**Tech Stack:** Next.js 15 (App Router, React Server Components), TypeScript, Tailwind v4 (existing design tokens only, no new ones), `gray-matter`, `next-mdx-remote`.

---

### Task 1: Install MDX dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install packages**

Run:
```bash
npm install gray-matter next-mdx-remote
```

- [ ] **Step 2: Verify install**

Run: `npm ls gray-matter next-mdx-remote`
Expected: both list a resolved version with no `UNMET DEPENDENCY` errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add gray-matter and next-mdx-remote for blog posts"
```

---

### Task 2: First post content file

**Files:**
- Create: `content/blog/anxiety-is-a-terrible-fortune-teller.mdx`

- [ ] **Step 1: Create the directory and file**

Create `content/blog/anxiety-is-a-terrible-fortune-teller.mdx` with exactly this content:

````mdx
---
title: "Anxiety Is a Terrible Fortune Teller"
date: "2026-09-25"
excerpt: "What if the future you're afraid of is not the future that is actually coming? On learning not to believe every prediction anxiety's mind makes."
---

What if the future you're afraid of is not the future that is actually coming?

How often does your mind convince you that something bad is going to happen—only for you to discover that it never did?

Maybe you sent someone a message and they haven't replied. And suddenly, your mind begins filling in the blanks.

They must be upset with me. Maybe I said something wrong. Perhaps they don't want to talk to me anymore. What if something has happened? What if I have damaged the relationship?

Nothing has actually happened. There is simply an unanswered message.

But anxiety doesn't like empty spaces. It wants an explanation. And when it doesn't have facts, it often creates a story.

And unfortunately, the anxious mind rarely writes a peaceful story. It writes the one that prepares you for the worst.

One unanswered message becomes rejection. One mistake becomes failure. One difficult conversation becomes the end of a relationship. One uncertain situation becomes a hundred frightening scenarios.

*Anxiety has a remarkable ability to turn possibilities into certainties.*

*It takes "What if?" and quietly turns it into "This is going to happen."*

And once the mind believes the story, the body often responds as though the danger is already real.

Your heart may race. Your breathing may change. Your muscles may become tense. Your thoughts may become faster. You may feel restless or unable to switch off.

And then something interesting happens.

You notice these sensations and think: "See? Something must really be wrong."

The anxiety creates the thought. The thought creates the physical response. The physical response then appears to confirm the thought.

And the cycle continues.

*But anxiety isn't your enemy.*

*It is your mind's attempt to protect you.*

Your brain is designed to notice potential threats and prepare you for them. That protective system can be incredibly useful when there is an actual danger.

But sometimes, anxiety can become overprotective. It can start treating uncertainty as danger. It can confuse possibility with probability. And it can mistake imagination for reality.

Your mind says: "What if something goes wrong?" And instead of recognising that as a question, you begin experiencing it as a prediction.

*But a thought is not a fact.*

*A possibility is not a certainty.*

And feeling afraid does not necessarily mean that something dangerous is happening.

So, what can you do when your mind begins to spiral?

## When your mind begins to spiral

The first step isn't to fight the thought.

Don't tell yourself: "I shouldn't be thinking this." Don't try desperately to force yourself to be positive.

Instead, pause. Take a breath. Create a little space between what your mind is saying and what is actually happening.

Ask yourself: What is actually true right now?

Not tomorrow. Not next week. Not the future your anxiety has created. Right now.

Then ask: *What do I know, and what am I assuming?*

This question can be incredibly powerful.

For example:

"My friend hasn't replied." That's what you know.

"My friend is angry with me." That's an assumption.

"My relationship is falling apart." That's a story about the future.

Separating facts from assumptions doesn't necessarily make the uncertainty disappear. But it stops your mind from turning uncertainty into certainty.

Then ask yourself: What problem actually exists in this moment?

Sometimes the answer is: "There is no problem I need to solve right now. There is simply something I don't know yet."

And that is an important distinction. Because not knowing is uncomfortable, but not knowing is not the same as being unsafe.

*You don't need to solve an imaginary future today.*

One of the exhausting things about anxiety is that it asks you to emotionally experience problems before they exist.

You have the conversation before it happens. You experience the rejection before it happens. You experience the failure before it happens. You experience the loss before it happens. You suffer through an entire future that may never arrive.

And by the time the actual moment comes, you are already exhausted from living through it in your mind.

So gently remind yourself: *"This is a possibility, not a reality."*

Come back to today. Come back to this moment. Come back to what is actually in front of you.

And when your mind takes you to the worst-case scenario, ask one more question: "Then what?"

This is not about dismissing your fear. It is about following the story all the way through.

Your mind says: "What if I make a mistake?" Then what?

"What if people judge me?" Then what?

"What if something doesn't work out?" Then what?

Keep going.

Because anxiety often stops the story at the frightening moment. It says: "This terrible thing might happen." And then it leaves you standing there, frozen in fear.

But life doesn't stop there. Even when difficult things happen, there is usually another chapter.

You respond. You adapt. You learn. You ask for help. You make another decision. You change direction. You recover. You begin again. You discover resources within yourself that you didn't know you had.

This is something anxiety often forgets to calculate. It calculates the possibility of pain. But it forgets to calculate your capacity to handle pain. It imagines what might happen to you. But it doesn't always imagine who you might become while moving through it.

## What if you trusted yourself instead of needing certainty?

Perhaps the answer to anxiety isn't to convince yourself: "Nothing bad will ever happen." Because we cannot know that.

Life will always contain uncertainty. People will disappoint us sometimes. Plans will change. Mistakes will happen. Unexpected things will happen. There will be moments we cannot control.

So perhaps the deeper question is not: "Can I be certain that everything will be okay?"

Perhaps it is: "Can I trust myself to meet whatever comes?"

That is a very different kind of security. It doesn't come from controlling the future. It comes from building a relationship with yourself in the present.

A relationship that says:

- I may not know what is coming.
- I may feel afraid.
- I may not have all the answers.
- But I can take the next step.
- I can ask for support.
- I can pause.
- I can learn.
- I can adapt.
- I can begin again.

*Your future deserves more than your fear.*

The anxious mind is often a brilliant storyteller. It can create vivid pictures of everything that could go wrong.

But remember: a vivid thought is still only a thought. The mind can imagine pain with extraordinary detail.

So perhaps we can teach it to imagine something else too.

- Imagine yourself handling the difficult conversation.
- Imagine yourself asking for help.
- Imagine yourself recovering from the mistake.
- Imagine yourself finding a solution.
- *Imagine yourself walking through uncertainty and discovering that you are stronger than you thought.*

Because anxiety is very good at imagining your future pain. It often forgets to imagine your future strength.

So the next time your mind predicts the worst, pause and gently say:

> I don't know what the future holds. And I don't need to know today. Right now, I am here. I can take one breath, one step, one moment at a time. Whatever comes, I will meet it when it comes.

You don't have to defeat anxiety. You don't have to silence every fearful thought.

*You simply have to learn not to believe every prediction your mind makes.*

Because anxiety may be a terrible fortune teller. But you can become a much kinder and more trusting companion to yourself as you walk into the unknown.

## A gentle reminder

If anxiety feels overwhelming, persistent, or begins to significantly interfere with your everyday life, reaching out to a qualified mental-health professional can be an important act of self-care.

You don't have to navigate everything alone.

Sometimes, asking for support isn't a sign that you aren't strong enough. It is one of the ways you honour your own strength.

## Take a moment to reflect

The next time you notice your mind predicting the worst, pause and ask:

- What is actually true right now?
- What am I assuming?
- What is within my control today?
- And if the worst-case scenario did happen, then what?

You may be surprised by what you discover.

Perhaps the future doesn't need your fear. Perhaps it simply needs your presence.

*One breath.*
*One moment.*
*One step at a time.*
````

- [ ] **Step 2: Commit**

```bash
git add content/blog/anxiety-is-a-terrible-fortune-teller.mdx
git commit -m "content: add first blog post — Anxiety Is a Terrible Fortune Teller"
```

---

### Task 3: `lib/blog.ts` — post reading utilities

**Files:**
- Create: `lib/blog.ts`

- [ ] **Step 1: Write the module**

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

function readPostFile(filename: string): { meta: PostMeta; content: string } {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
    },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return filenames
    .map((f) => readPostFile(f).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readPostFile(`${slug}.mdx`);
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `lib/blog.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/blog.ts
git commit -m "feat(blog): add post reading utilities"
```

---

### Task 4: MDX typography components

**Files:**
- Create: `components/blog/mdx-components.tsx`

- [ ] **Step 1: Write the component map**

```tsx
export const mdxComponents = {
  h2: (props) => (
    <h2 className="mt-12 font-display text-2xl text-ink md:text-3xl" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 font-display text-xl text-ink md:text-2xl" {...props} />
  ),
  p: (props) => (
    <p className="mt-6 font-body text-lg leading-relaxed text-ink/90" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-6 list-disc space-y-2 pl-6 font-body text-lg leading-relaxed text-ink/90" {...props} />
  ),
  li: (props) => <li {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-2 border-brass/50 pl-5 font-display text-xl text-teal-deep"
      {...props}
    />
  ),
  em: (props) => <em className="text-teal-deep not-italic" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
};
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `components/blog/mdx-components.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/blog/mdx-components.tsx
git commit -m "feat(blog): add MDX typography component map"
```

---

### Task 5: Blog listing page

**Files:**
- Create: `app/blog/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Dustt Temple",
  description: "Reflections and writing from Dustt Temple.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">Blog</p>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Writing from the temple</h1>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-ink/10 bg-paper-alt/40 p-6 transition-colors hover:bg-paper/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:p-8"
              >
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-quiet">
                  {formatDate(post.date)}
                </span>
                <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">{post.title}</h2>
                <p className="mt-3 font-body text-base text-quiet">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `app/blog/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat(blog): add blog listing page"
```

---

### Task 6: Single post page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} — Dustt Temple`,
    description: post.meta.excerpt,
    openGraph: { title: post.meta.title, description: post.meta.excerpt, type: "article" },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="bg-paper">
      <div className="mx-auto max-w-2xl px-5 py-24 md:px-8 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-deep">Blog</p>
        <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">{post.meta.title}</h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-quiet">
          {formatDate(post.meta.date)}
        </p>

        <div className="mt-10">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <Link
          href="/blog"
          className="mt-16 inline-block rounded-sm font-mono text-xs uppercase tracking-[0.16em] text-teal-deep transition-colors hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `app/blog/[slug]/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add "app/blog/[slug]/page.tsx"
git commit -m "feat(blog): add single post page"
```

---

### Task 7: Wire up nav and footer

**Files:**
- Modify: `content/site.ts:12-17`
- Modify: `components/layout/site-footer.tsx:7-11`

- [ ] **Step 1: Add "Blog" to the nav array**

In `content/site.ts`, change:

```typescript
export const nav: NavItem[] = [
  { label: "Practices", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Kind words", href: "#testimonials" },
  { label: "Questions", href: "#faq" },
];
```

to:

```typescript
export const nav: NavItem[] = [
  { label: "Practices", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Kind words", href: "#testimonials" },
  { label: "Questions", href: "#faq" },
  { label: "Blog", href: "/blog" },
];
```

- [ ] **Step 2: Fix the footer's stub Blog link**

In `components/layout/site-footer.tsx`, change:

```typescript
const footerNav = [
  { label: "Home", href: "#top" },
  { label: "Blog", href: "#" },
  { label: "About", href: "#about" },
];
```

to:

```typescript
const footerNav = [
  { label: "Home", href: "#top" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "#about" },
];
```

- [ ] **Step 3: Verify in the browser**

Run `npm run dev`, visit `http://localhost:3000/`, confirm "Blog" now appears in the desktop nav (both on the homepage header and in the mobile menu at a narrow viewport), and the footer's "Blog" link points to `/blog`.

- [ ] **Step 4: Commit**

```bash
git add content/site.ts components/layout/site-footer.tsx
git commit -m "feat(blog): wire Blog link into nav and footer"
```

---

### Task 8: End-to-end test coverage

**Files:**
- Create: `e2e/blog.spec.ts`

- [ ] **Step 1: Write the test**

```typescript
import { test, expect } from "@playwright/test";

test("blog nav link navigates to the listing page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Blog", exact: true }).first().click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/writing/i);
});

test("listing page links to the first post and renders it", async ({ page }) => {
  await page.goto("/blog");
  await page.getByRole("link", { name: /anxiety is a terrible fortune teller/i }).click();
  await expect(page).toHaveURL(/\/blog\/anxiety-is-a-terrible-fortune-teller$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/anxiety is a terrible fortune teller/i);
  await expect(page.getByRole("link", { name: /back to blog/i })).toBeVisible();
});
```

- [ ] **Step 2: Run the tests**

Run: `npm run test:e2e -- e2e/blog.spec.ts`
Expected: both tests PASS.

- [ ] **Step 3: Run the full e2e suite to check for regressions**

Run: `npm run test:e2e`
Expected: all tests PASS (existing homepage/nav/footer tests unaffected).

- [ ] **Step 4: Commit**

```bash
git add e2e/blog.spec.ts
git commit -m "test(blog): add e2e coverage for blog nav and post page"
```

---

### Task 9: Lint, type-check, and manual verification

**Files:** none (verification only)

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 2: Run the full type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual check in the browser**

With `npm run dev` running, visit:
- `http://localhost:3000/blog` — confirm the listing shows the one post with a formatted date and excerpt, styled consistently with the rest of the site (paper background, Fraunces heading, mono eyebrow label).
- `http://localhost:3000/blog/anxiety-is-a-terrible-fortune-teller` — confirm the full post renders: title, date, paragraphs, the `##` subheadings, the bullet lists, the blockquote, and italicized lines (in teal-deep, not literal asterisks) all display correctly, and "← Back to Blog" returns to the listing.
- Resize to a mobile width (e.g. 390px) and confirm the mobile nav sheet shows "Blog" and no horizontal overflow occurs on either blog page.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: build succeeds with `/blog` and `/blog/anxiety-is-a-terrible-fortune-teller` listed in the route output (static or SSG).

---

### Task 10: Push

**Files:** none

- [ ] **Step 1: Push the branch**

```bash
git push
```

(Confirm with the user first if this repo's convention is to open a PR rather than push directly to `main`.)
