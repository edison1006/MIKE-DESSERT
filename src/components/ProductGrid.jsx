import ProductCard from './ProductCard';

const ProductGrid = ({ items, heading, subheading }) => (
  <section>
    {(heading || subheading) && (
      <div className="section-heading">
        {heading && <h2>{heading}</h2>}
        {subheading && <span>{subheading}</span>}
      </div>
    )}
    <div className="card-grid">
      {items.map((item) => (
        <ProductCard key={item.name} product={item} />
      ))}
    </div>
  </section>
);

export default ProductGrid;
