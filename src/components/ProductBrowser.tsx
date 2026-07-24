"use client";
import { useMemo, useState } from "react";
import { SITE } from "@/site";

export type CatalogProduct = {
  name: string;
  category: string;
  origin?: string;
  size?: string;
  note?: string;
};

export function ProductBrowser({ products }: { products: CatalogProduct[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!q) return true;
      return [p.name, p.category, p.origin, p.note]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [products, query, category]);

  return (
    <div className="catalog__browser">
      <div className="catalog__controls">
        <input
          className="catalog__search"
          type="search"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
        <div className="catalog__chips">
          <button
            className={`chip ${category === null ? "chip--on" : ""}`}
            onClick={() => setCategory(null)}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? "chip--on" : ""}`}
              onClick={() => setCategory(category === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="catalog__count">
        {shown.length} {shown.length === 1 ? "product" : "products"}
      </div>
      <div className="catalog__grid">
        {shown.map((p, i) => (
          <div className="item" key={i}>
            <div className="item__cat">{p.category}</div>
            <h3 className="item__name">{p.name}</h3>
            <div className="item__meta">
              {[p.origin, p.size].filter(Boolean).join(" · ")}
            </div>
            {p.note ? <p className="item__note">{p.note}</p> : null}
            <a
              className="item__cta"
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                `Enquiry: ${p.name}${p.size ? ` (${p.size})` : ""}`
              )}`}
            >
              Enquire →
            </a>
          </div>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="catalog__empty">
          Nothing matches that search — try a different word, or{" "}
          <a href={`mailto:${SITE.email}`}>ask us directly</a>.
        </p>
      ) : null}
    </div>
  );
}
