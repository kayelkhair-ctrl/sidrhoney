import type { Metadata } from "next";
import { products } from "@/catalog";

export const metadata: Metadata = {
  title: "Our Products — Sidr Honey Ltd",
  description:
    "The Sidr Honey Ltd range: pure mountain sidr honey, black seed honey, royal honey sachets, herbal honey blends and genuine Ajwa Al-Madina dates — wholesale and retail.",
};

export default function ProductsPage() {
  return (
    <main className="catalog">
      <div className="wrap">
        <div className="catalog__head">
          <div className="collection__kicker">the range —</div>
          <h1 className="catalog__title">Our Products</h1>
          <p className="catalog__lead">
            A short list, kept deliberately short: the honeys, blends and dates
            we would put our own name to. Every one is available retail and by
            the case for trade.
          </p>
        </div>
        <div className="catalog__grid catalog__grid--wide">
          {products.map((p) => (
            <a className="pitem" href={`/products/${p.slug}/`} key={p.slug}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="pitem__img" src={p.image} alt={p.name} loading="lazy" />
              <div className="pitem__body">
                <div className="pitem__cat">{p.category}</div>
                <h2 className="pitem__name">{p.name}</h2>
                <p className="pitem__desc">{p.tagline}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
