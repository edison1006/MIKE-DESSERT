const ProductCard = ({ product }) => (
  <article className="card product-card">
    <div
      className="product-visual"
      style={{
        background: `linear-gradient(135deg, ${product.accent}, rgba(255,255,255,0.95))`,
      }}
    />
    <h3 className="product-name">{product.name}</h3>
    <p className="product-desc">{product.description}</p>
    <span className="product-price">{product.price}</span>
    <div className="tag-list">
      {product.tags.map((tag) => (
        <span className="tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  </article>
);

export default ProductCard;
