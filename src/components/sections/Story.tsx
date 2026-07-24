export type StoryProps = {
  kicker: string;
  title: string;
  paragraphs: { text: string }[];
  stats: { num: string; label: string }[];
  image?: string;
  imageAlt?: string;
};

export function Story({ kicker, title, paragraphs, stats, image, imageAlt }: StoryProps) {
  return (
    <section className="story" id="story">
      <div className={`wrap ${image ? "story__grid" : ""}`}>
        <div>
          {kicker ? <div className="story__kicker">{kicker}</div> : null}
          <h2>{title}</h2>
          {(paragraphs ?? []).map((p, i) => (
            <p key={i}>{p.text}</p>
          ))}
        </div>
        {image ? (
          <div className="story__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt || ""} loading="lazy" />
          </div>
        ) : null}
        {stats?.length ? (
          <div className="story__stats">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="stat__num">{s.num}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
