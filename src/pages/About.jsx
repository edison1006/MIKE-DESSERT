import PageHero from '../components/PageHero';

const milestones = [
  { year: '2014', detail: 'Chef Mika opens a four-seat tasting counter in Da’an.' },
  { year: '2018', detail: 'Launch of the cloud patisserie with cold-chain delivery nationwide.' },
  { year: '2021', detail: 'Introduced farm partnerships for single-origin eggs and jersey milk.' },
  { year: '2024', detail: 'New atelier flagship with immersive tasting salon and research kitchen.' },
];

const values = [
  'Respect for Taiwanese terroir and growers',
  'French technique meets playful East Asian flavor arcs',
  'Sustainably minded packaging and supply chain',
  'Guided concierge for intimate celebrations',
];

const About = () => (
  <>
    <PageHero
      eyebrow="Our universe"
      title="Composing edible stories"
      description="We are a multidisciplinary dessert studio weaving tea rituals, patisserie craft, and botanical seasons into layered textures."
      ctas={[
        { label: 'Meet the chef', variant: 'primary', href: 'mailto:hello@mikadessert.com' },
      ]}
    />
    <section>
      <div className="section-heading">
        <h2>Timeline</h2>
        <span>Milestones</span>
      </div>
      <div className="timeline">
        {milestones.map((item) => (
          <article key={item.year}>
            <strong>{item.year}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
    <section>
      <div className="section-heading">
        <h2>House codes</h2>
        <span>What guides us</span>
      </div>
      <ul className="values">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </section>
  </>
);

export default About;
