import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPost, getPosts } from "@/blog";
import { SITE } from "@/site";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: `${post?.title ?? "Journal"} — Sidr Honey Ltd`,
    description: post?.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await marked.parse(post.body);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.legalName },
    publisher: { "@type": "Organization", name: SITE.legalName },
  };

  return (
    <main className="catalog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="wrap">
        <div className="catalog__topbar">
          <a className="catalog__back" href="/blog/">
            ← Journal
          </a>
        </div>
        <article className="article">
          <h1 className="article__title">{post.title}</h1>
          <div
            className="article__body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </main>
  );
}
