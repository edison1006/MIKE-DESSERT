import PageHero from '../components/PageHero';
import DetailsPanel from '../components/DetailsPanel';
import { highlights, shopDetails } from '../data/products';

const inquiries = [
  { label: 'Custom celebration cakes', email: 'celebrations@mikadessert.com' },
  { label: 'Wholesale & hotels', email: 'partners@mikadessert.com' },
  { label: 'Editorial & interviews', email: 'press@mikadessert.com' },
];

const Contact = () => (
  <>
    <PageHero
      eyebrow="Concierge desk"
      title="Plan something delicious"
      description="Tell us about your gathering, and our concierge will curate textures, flowers, and delivery logistics within 24 hours."
      ctas={[
        { label: 'Book via email', variant: 'primary', href: 'mailto:hello@mikadessert.com' },
        { label: 'Call the atelier', variant: 'secondary', href: 'tel:+886234567788' },
      ]}
    />
    <DetailsPanel items={highlights} />
    <section>
      <div className="section-heading">
        <h2>Dedicated inboxes</h2>
        <span>We respond in 1 business day</span>
      </div>
      <div className="card-grid">
        {inquiries.map((item) => (
          <article className="card" key={item.email}>
            <h3>{item.label}</h3>
            <a href={`mailto:${item.email}`}>{item.email}</a>
          </article>
        ))}
        <article className="card">
          <h3>Visit</h3>
          <p>{shopDetails.address}</p>
          <p>{shopDetails.hours}</p>
        </article>
      </div>
    </section>
  </>
);

export default Contact;
