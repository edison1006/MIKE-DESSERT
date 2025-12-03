import PageHero from '../components/PageHero';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const groupByCategory = (items) =>
  items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

const Menu = () => {
  const grouped = groupByCategory(products);

  return (
    <>
      <PageHero
        eyebrow="Seasonal menu"
        title="Hand-finished desserts"
        description="Every item is made-to-order with local dairy, ceremonial teas, and responsibly sourced fruit."
        ctas={[
          { label: 'Order via Line', variant: 'primary', href: 'https://line.me/en/' },
          { label: 'Contact concierge', variant: 'secondary', href: '/contact' },
        ]}
      />
      {Object.entries(grouped).map(([category, items]) => (
        <ProductGrid
          key={category}
          items={items}
          heading={category}
          subheading={`${items.length} selection${items.length > 1 ? 's' : ''}`}
        />
      ))}
    </>
  );
};

export default Menu;
