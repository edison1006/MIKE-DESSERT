import { Link } from 'react-router-dom';

const CustomOrderShowcase = () => {
  const features = [
    {
      icon: '🎂',
      title: 'Celebration Cakes',
      description: 'Custom designs for birthdays, weddings, and special occasions',
    },
    {
      icon: '🎨',
      title: 'Bespoke Flavors',
      description: 'Work with our pastry chefs to create unique flavor combinations',
    },
    {
      icon: '📅',
      title: '7-Day Lead Time',
      description: 'Plan ahead for your perfect dessert experience',
    },
    {
      icon: '👥',
      title: 'Private Tastings',
      description: 'Intimate tastings for groups of 20 or fewer',
    },
  ];

  return (
    <section className="custom-order-showcase">
      <div className="showcase-container">
        <div className="showcase-header">
          <h2 className="showcase-title">Private Custom Orders</h2>
          <p className="showcase-subtitle">Crafted exclusively for your celebration</p>
        </div>

        <div className="showcase-features">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="showcase-cta">
          <Link to="/contact" className="btn btn-primary showcase-btn">
            Book a Consultation
          </Link>
          <Link to="/about" className="btn btn-secondary showcase-btn">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomOrderShowcase;

