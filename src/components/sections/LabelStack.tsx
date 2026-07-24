import { PromiseIcon } from "@/components/art";

export type LabelStackProps = {
  kicker?: string;
  title?: string;
  promises: { title: string; text: string; icon: string }[];
};

export function LabelStack({
  kicker = "The standard",
  title = "Bought at source. Sold with our name on it.",
  promises,
}: LabelStackProps) {
  return (
    <section className="stack" id="promise">
      <div className="wrap">
        <div className="stack__head">
          <div className="tag">{kicker}</div>
          <h2 className="stack__title">{title}</h2>
        </div>
        {(promises ?? []).map((p, i) => (
          <div className="stack__row" key={i}>
            <div className="stack__num">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="stack__rowtitle">{p.title}</h3>
            <p className="stack__text">{p.text}</p>
            <div className="stack__icon">
              <PromiseIcon name={p.icon} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
