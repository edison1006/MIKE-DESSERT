import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const SiteHeader = () => (
  <header className="site-header">
    <div className="brand">
      <img src="/assets/MIKA-DESSERT_LOGO.JPG" alt="Mika Dessert logo" />
      <div>
        <p className="brand-eyebrow">Mika Dessert</p>
        <strong>Cake Atelier</strong>
      </div>
    </div>
    <nav>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  </header>
);

export default SiteHeader;
