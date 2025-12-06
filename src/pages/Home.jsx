import HeroCarousel from '../components/HeroCarousel';
import BestSellersCarousel from '../components/BestSellersCarousel';
import CustomOrderShowcase from '../components/CustomOrderShowcase';
import { products } from '../data/products';

const Home = () => (
  <>
    <HeroCarousel items={products} />
    <BestSellersCarousel products={products} />
    <CustomOrderShowcase />
  </>
);

export default Home;
