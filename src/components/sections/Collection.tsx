import { Jar } from "@/components/art";

export type CollectionProps = {
  kicker: string;
  title: string;
  products: {
    name: string;
    tagline: string;
    price: string;
    ctaLabel: string;
    ctaHref: string;
    look: string;
    image?: string;
  }[];
};

const LOOKS: Record<string, { card: string; honey: [string, string]; label: string }> = {
  amber: { card: "pcard--amber", honey: ["#8a4f07", "#5e3403"], label: "#f6ead0" },
  night: { card: "pcard--night", honey: ["#e9a83b", "#b3730f"], label: "#f2e8d2" },
  olive: { card: "pcard--olive", honey: ["#4a4722", "#2f2d13"], label: "#efe6c4" },
  gold: { card: "pcard--gold", honey: ["#9a6a10", "#6d4a08"], label: "#fdf3d9" },
};

export function Collection({ kicker, title, products }: CollectionProps) {
  return (
    <section className="collection" id="collection">
      <div className="wrap">
        <div className="collection__head">
          <div>
            {kicker ? <div className="collection__kicker">{kicker}</div> : null}
            <h2 className="collection__title">{title}</h2>
          </div>
        </div>
        <div className="collection__grid">
          {(products ?? []).map((p, i) => {
            const look = LOOKS[p.look] ?? LOOKS.amber;
            return (
              <a className={`pcard ${look.card}`} href={p.ctaHref || "#contact"} key={i}>
                {p.image ? (
                  <div className="pcard__stage pcard__stage--photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </div>
                ) : (
                  <div className="pcard__stage">
                    <div className="pcard__jar">
                      <Jar honeyTop={look.honey[0]} honeyBottom={look.honey[1]} label={look.label} />
                    </div>
                  </div>
                )}
                <div className="pcard__body">
                  <h3 className="pcard__name">{p.name}</h3>
                  {p.tagline ? <p className="pcard__tag">{p.tagline}</p> : null}
                </div>
                <div className="pcard__bar">
                  <span className="pcard__cta">{p.ctaLabel || "Enquire"} →</span>
                  <span>{p.price}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
