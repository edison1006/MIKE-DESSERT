import HeroCarousel from '../components/HeroCarousel';
import { products } from '../data/products';

const Home = () => (
  <>
    <HeroCarousel items={products} />
  </>
);

export default Home;
