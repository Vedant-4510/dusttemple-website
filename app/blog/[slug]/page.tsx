import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
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
    <>
      <SiteHeader />
      <main id="main">
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
      </main>
      <SiteFooter />
    </>
  );
}
