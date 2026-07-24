export type FaqProps = {
  title: string;
  items: { question: string; answer: string }[];
};

export function Faq({ title, items }: FaqProps) {
  return (
    <section className="faq" id="faq">
      <h2 className="faq__title">{title}</h2>
      {(items ?? []).map((item, i) => (
        <details key={i}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}
