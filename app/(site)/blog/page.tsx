import type { Metadata } from "next";
import { getPosts } from "@/blog";

export const metadata: Metadata = {
  title: "Journal — Sidr Honey Ltd",
  description:
    "Notes from the importer: guides to sidr honey, ajwa dates, black seed and the foods of the tradition.",
};

const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <main className="catalog">
      <div className="wrap">
        <div className="catalog__head">
          <div className="collection__kicker">notes from the importer —</div>
          <h1 className="catalog__title">Journal</h1>
          <p className="catalog__lead">
            Plain-spoken guides to the foods we import — what they are, how to
            recognise the genuine article, and how they are enjoyed.
          </p>
        </div>
        <div className="bloglist">
          {posts.map((p) => (
            <a className="blogcard" href={`/blog/${p.slug}/`} key={p.slug}>
              <div className="blogcard__date">{fmt(p.date)}</div>
              <h2 className="blogcard__title">{p.title}</h2>
              <p className="blogcard__desc">{p.description}</p>
              <span className="blogcard__more">Read →</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
