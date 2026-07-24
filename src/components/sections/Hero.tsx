import { HoneycombCanvas } from "@/components/HoneycombCanvas";
import { HoneyDrip } from "@/components/art";

export type HeroProps = {
  arabic: string;
  arabicImage?: string;
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
  arabicImage,
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero__mark" src="/media/logo-mark.png" alt="" />
      {eyebrow ? <div className="hero__eyebrow">{eyebrow}</div> : null}
      <div className="hero__inner">
        {arabic || arabicImage ? (
          <div className="hero__arabic">
            <span className="hero__rule" aria-hidden="true" />
            <span className="hero__diamond" aria-hidden="true" />
            {arabicImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img className="hero__arabic-img" src={arabicImage} alt={arabic} />
            ) : (
              <span className="hero__arabic-wrap">
                <span className="hero__arabic-text" lang="ar" dir="rtl">
                  {arabic}
                </span>
                <HoneyDrip className="hero__drip hero__drip--1" gid="hdrip1" />
                <HoneyDrip className="hero__drip hero__drip--2" gid="hdrip2" />
                <HoneyDrip className="hero__drip hero__drip--3" gid="hdrip3" />
              </span>
            )}
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
