import SmallCardCarousel from './SmallCardCarousel';

const BestSellersCarousel = ({ products }) => {
  // 筛选出 best seller 标签的产品
  const bestSellers = products.filter((product) =>
    product.tags.some((tag) => tag.toLowerCase().includes('best seller'))
  );

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <section className="best-sellers-section">
      <SmallCardCarousel
        items={bestSellers}
        heading="Best Sellers"
        subheading="Customer favorites"
        autoPlayInterval={5000}
      />
    </section>
  );
};

export default BestSellersCarousel;

