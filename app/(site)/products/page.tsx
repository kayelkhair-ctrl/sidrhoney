import type { Metadata } from "next";
import { ProductBrowser, type CatalogProduct } from "@/components/ProductBrowser";
import products from "../../../content/products.json";

export const metadata: Metadata = {
  title: "All Products — Sidr Honey Ltd",
  description:
    "The full range we import and supply: raw honeys, black seed, dates, olive oil and traditional pantry goods — available retail and wholesale.",
};

export default function ProductsPage() {
  return (
    <main className="catalog">
      <div className="wrap">
        <div className="catalog__head">
          <div className="collection__kicker">everything we carry —</div>
          <h1 className="catalog__title">All Products</h1>
          <p className="catalog__lead">
            What we import and supply — retail and wholesale, London and across
            the UK. Tap any product to ask about it on WhatsApp. If you are
            looking for something you do not see, ask — if it is good, we can
            usually land it.
          </p>
        </div>
        <ProductBrowser products={products as CatalogProduct[]} />
      </div>
    </main>
  );
}
