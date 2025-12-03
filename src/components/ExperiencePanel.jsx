const ExperiencePanel = ({ entries }) => (
  <section>
    <div className="section-heading">
      <h2>House Experience</h2>
      <span>Taste · Texture · Ritual</span>
    </div>
    <div className="experience">
      {entries.map(({ quote, author }) => (
        <article key={author}>
          <blockquote>{quote}</blockquote>
          <strong>{author}</strong>
        </article>
      ))}
    </div>
  </section>
);

export default ExperiencePanel;
