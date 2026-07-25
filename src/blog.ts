import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  body: string;
};

const dir = join(process.cwd(), "content", "blog");

function parse(slug: string, raw: string): Post {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
    }
  }
  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? "",
    description: meta.description ?? "",
    body: m ? m[2] : raw,
  };
}

export function getPosts(): Post[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, ""), readFileSync(join(dir, f), "utf8")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
