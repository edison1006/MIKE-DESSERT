import LogoMark from './LogoMark';

const PageHero = ({ title, eyebrow, description, ctas = [] }) => (
  <header className="hero">
    <div>
      <LogoMark />
    </div>
    <div>
      {eyebrow && <p className="section-label">{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p className="hero-description">{description}</p>}
      {ctas.length > 0 && (
        <div className="hero-actions">
          {ctas.map(({ label, variant = 'primary', href }) => (
            <a
              key={label}
              className={`btn btn-${variant}`}
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noreferrer' : undefined}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  </header>
);

export default PageHero;
