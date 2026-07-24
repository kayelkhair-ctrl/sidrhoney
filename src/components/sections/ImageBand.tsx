export type ImageBandProps = {
  image: string;
  alt: string;
  caption: string;
};

export function ImageBand({ image, alt, caption }: ImageBandProps) {
  if (!image) {
    return <></>;
  }
  return (
    <section className="band">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="band__img" src={image} alt={alt || ""} loading="lazy" />
      {caption ? <div className="band__caption">{caption}</div> : null}
    </section>
  );
}
