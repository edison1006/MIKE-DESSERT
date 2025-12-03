import PageHero from '../components/PageHero';
import DetailsPanel from '../components/DetailsPanel';
import ProductGrid from '../components/ProductGrid';
import ExperiencePanel from '../components/ExperiencePanel';
import { products, shopDetails, highlights, experiences } from '../data/products';

const Home = () => (
  <>
    <PageHero
      eyebrow="Mika Dessert · Cake Shop"
      title={shopDetails.name}
      description={shopDetails.tagline}
      ctas={[
        { label: 'Reserve a tasting', variant: 'primary', href: 'mailto:hello@mikadessert.com' },
        { label: 'View seasonal menu', variant: 'secondary', href: '/menu' },
      ]}
    />
    <DetailsPanel items={highlights} />
    <ProductGrid
      items={products.slice(0, 4)}
      heading="Collection du Jour"
      subheading="Chef selected favorites"
    />
    <ExperiencePanel entries={experiences} />
  </>
);

export default Home;
