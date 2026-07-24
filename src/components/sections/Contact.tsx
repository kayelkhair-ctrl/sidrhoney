export type ContactProps = {
  kicker: string;
  title: string;
  text: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export function Contact({
  kicker,
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: ContactProps) {
  return (
    <section className="contact" id="contact">
      {kicker ? <div className="contact__kicker">{kicker}</div> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
      <div className="contact__actions">
        {primaryLabel ? (
          <a className="btn btn--cream" href={primaryHref || "#"}>
            {primaryLabel}
          </a>
        ) : null}
        {secondaryLabel ? (
          <a className="btn btn--outline-cream" href={secondaryHref || "#"}>
            {secondaryLabel}
          </a>
        ) : null}
      </div>
    </section>
  );
}
