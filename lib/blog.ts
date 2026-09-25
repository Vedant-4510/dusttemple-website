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
