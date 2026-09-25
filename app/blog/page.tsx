import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
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
    <>
      <SiteHeader />
      <main id="main">
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
      </main>
      <SiteFooter />
    </>
  );
}
