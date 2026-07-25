import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, productBySlug, type Nutrition } from "@/catalog";
import { SITE } from "@/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  return {
    title: `${p?.name ?? "Product"} — Wholesale & Retail | Sidr Honey Ltd`,
    description: p?.description,
  };
}

const NUTRITION_ROWS: { key: keyof Nutrition; label: string; unit: string }[] = [
  { key: "energyKcal", label: "Energy", unit: " kcal" },
  { key: "fat", label: "Fat", unit: " g" },
  { key: "saturates", label: "— of which saturates", unit: " g" },
  { key: "carbs", label: "Carbohydrate", unit: " g" },
  { key: "sugars", label: "— of which sugars", unit: " g" },
  { key: "fibre", label: "Fibre", unit: " g" },
  { key: "protein", label: "Protein", unit: " g" },
  { key: "salt", label: "Salt", unit: " g" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: `${SITE.domain}${p.image}`,
    brand: { "@type": "Brand", name: SITE.legalName },
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "GBP",
      seller: { "@type": "Organization", name: SITE.legalName },
    },
  };

  return (
    <main className="catalog pdp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="wrap">
        <div className="catalog__topbar">
          <a className="catalog__back" href="/products/">
            ← All products
          </a>
        </div>
        <div className="pdp__grid">
          <div className="pdp__stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pdp__img" src={p.image} alt={p.name} />
          </div>
          <div className="pdp__info">
            <div className="pitem__cat">{p.category}</div>
            <h1 className="pdp__name">{p.name}</h1>
            <p className="pdp__desc pdp__desc--lead">{p.tagline}</p>
            <div className="pdp__actions">
              <a
                className="btn"
                href={`${SITE.whatsapp}?text=${encodeURIComponent(
                  `Salaam — I'd like to ask about: ${p.name}`
                )}`}
                target="_blank"
                rel="noopener"
              >
                Ask on WhatsApp
              </a>
              <a
                className="btn btn--ghost"
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Enquiry: ${p.name}`)}`}
              >
                Email us
              </a>
            </div>

            <section className="pdp__section">
              <h2 className="pdp__h2">About this product</h2>
              {p.about.map((para, i) => (
                <p className="pdp__desc" key={i}>
                  {para}
                </p>
              ))}
            </section>

            <section className="pdp__section">
              <h2 className="pdp__h2">How it&rsquo;s enjoyed</h2>
              <ul className="pdp__list">
                {p.enjoy.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </section>

            {p.nutrition ? (
              <section className="pdp__section">
                <div className="nutri">
                  <h2 className="nutri__title">Typical values (per 100g)</h2>
                  <table className="nutri__table">
                    <tbody>
                      {NUTRITION_ROWS.map((row) => (
                        <tr key={row.key}>
                          <td>{row.label}</td>
                          <td>
                            {p.nutrition![row.key]}
                            {row.unit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="nutri__note">
                    Representative values for this type of product. For exact
                    figures, always refer to the label on the pack you receive.
                  </p>
                </div>
              </section>
            ) : (
              <section className="pdp__section">
                <div className="nutri">
                  <h2 className="nutri__title">Nutrition</h2>
                  <p className="nutri__note">
                    Composition varies by recipe and batch — full nutrition
                    information is printed on every pack. Ask us for the current
                    label if you need it before ordering.
                  </p>
                </div>
              </section>
            )}

            <section className="pdp__section">
              <h2 className="pdp__h2">Storage</h2>
              <p className="pdp__desc">{p.storage}</p>
            </section>

            <section className="pdp__section">
              <h2 className="pdp__h2">Brands we stock</h2>
              <p className="pdp__desc">{p.brands}</p>
            </section>

            <div className="pdp__trade">
              Available retail and wholesale — by the case or pallet — from{" "}
              {SITE.legalName}, {SITE.address}. All products halal.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
