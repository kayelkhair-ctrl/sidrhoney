export type SunnahProps = {
  arabic: string;
  english: string;
  reference: string;
};

export function Sunnah({ arabic, english, reference }: SunnahProps) {
  return (
    <section className="sunnah" id="sunnah">
      <div className="sunnah__inner">
        {arabic ? (
          <p className="sunnah__arabic" lang="ar" dir="rtl">
            {arabic}
          </p>
        ) : null}
        {english ? <p className="sunnah__en">{english}</p> : null}
        {reference ? <div className="sunnah__ref">{reference}</div> : null}
      </div>
    </section>
  );
}
