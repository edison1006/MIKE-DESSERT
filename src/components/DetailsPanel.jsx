const DetailsPanel = ({ items }) => (
  <section className="details-panel">
    {items.map((item) => (
      <article className="detail-card" key={item.title}>
        <h3>{item.title}</h3>
        {item.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </article>
    ))}
  </section>
);

export default DetailsPanel;
