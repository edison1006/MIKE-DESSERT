import { useState, useEffect, useRef } from 'react';

const HeroCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused && items.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  if (!items || items.length === 0) return null;

  const currentProduct = items[currentIndex];

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        className="carousel-nav-btn carousel-nav-prev"
        onClick={handlePrev}
        aria-label="Previous product"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="hero-carousel-slide">
        <div
          className="hero-product-image"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${currentProduct.accent}60 0%, ${currentProduct.accent}30 40%, #1a1a1a 100%)`,
          }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="product-title-box">
                <h2 className="product-title">{currentProduct.name}</h2>
              </div>
              <div className="product-description-box">
                <p className="product-description">{currentProduct.description}</p>
              </div>
              <div className="product-price-box">
                <span className="product-price-large">{currentProduct.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="carousel-nav-btn carousel-nav-next"
        onClick={handleNext}
        aria-label="Next product"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {items.length > 1 && (
        <div className="hero-carousel-dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;

