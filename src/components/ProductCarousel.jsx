import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';

const ProductCarousel = ({ items, heading, subheading, autoPlayInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const intervalRef = useRef(null);

  const totalItems = items.length;

  // 响应式：根据窗口大小调整每屏显示数量
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth <= 640) {
        setItemsPerView(1);
      } else if (window.innerWidth <= 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  useEffect(() => {
    // 当itemsPerView改变时，重置currentIndex
    const maxIndex = Math.max(0, totalItems - itemsPerView);
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsPerView, totalItems]);

  useEffect(() => {
    if (!isPaused && totalItems > itemsPerView) {
      const maxIndex = totalItems - itemsPerView;
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, totalItems, itemsPerView, autoPlayInterval]);

  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  if (totalItems <= itemsPerView) {
    // 如果产品数量少于等于每屏显示数量，使用普通网格
    return (
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
  }

  return (
    <section className="product-carousel-section">
      {(heading || subheading) && (
        <div className="section-heading">
          {heading && <h2>{heading}</h2>}
          {subheading && <span>{subheading}</span>}
        </div>
      )}
      <div
        className="product-carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={handlePrev}
          aria-label="Previous products"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="product-carousel-track">
          <div
            className="product-carousel-slide"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {items.map((item) => (
              <div key={item.name} className="carousel-item">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
        <button
          className="carousel-btn carousel-btn-next"
          onClick={handleNext}
          aria-label="Next products"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="carousel-dots">
        {Array.from({ length: totalItems - itemsPerView + 1 }).map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;

