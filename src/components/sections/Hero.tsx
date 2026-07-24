import { HoneycombCanvas } from "@/components/HoneycombCanvas";

export type HeroProps = {
  arabic: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export function Hero({
  arabic,
  eyebrow,
  title,
  titleAccent,
  lead,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroProps) {
  return (
    <section className="hero" id="top">
      <HoneycombCanvas />
      <div className="hero__frame" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero__mark" src="/media/logo-mark.png" alt="" />
      {eyebrow ? <div className="hero__eyebrow">{eyebrow}</div> : null}
      <div className="hero__inner">
        {arabic ? (
          <div className="hero__arabic">
            <span className="hero__rule" aria-hidden="true" />
            <span className="hero__diamond" aria-hidden="true" />
            <span className="hero__arabic-text" lang="ar" dir="rtl">
              {arabic}
            </span>
            <span className="hero__diamond" aria-hidden="true" />
            <span className="hero__rule" aria-hidden="true" />
          </div>
        ) : null}
        <h1 className="hero__title">
          {title} {titleAccent ? <em>{titleAccent}</em> : null}
        </h1>
        {lead ? <p className="hero__lead">{lead}</p> : null}
        <div className="hero__actions">
          {primaryLabel ? (
            <a className="btn" href={primaryHref || "#collection"}>
              {primaryLabel}
            </a>
          ) : null}
          {secondaryLabel ? (
            <a className="btn btn--ghost" href={secondaryHref || "#contact"}>
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
