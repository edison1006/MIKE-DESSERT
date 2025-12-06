import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { label: 'Home Page', to: '/' },
  { label: 'Shop', to: '/menu', hasDropdown: true },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about', hasDropdown: true },
];

const SiteHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="site-header-modern">
      <div className="header-top">
        <div className="brand-modern">
          <div className="logo-circle">
            <span>M</span>
          </div>
          <div className="brand-text">
            <h1 className="brand-name">mika</h1>
            <p className="brand-subtitle">DESSERT FACTORY</p>
          </div>
        </div>
        <nav className="nav-modern">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link-modern ${isActive ? 'active' : ''} ${item.hasDropdown ? 'has-dropdown' : ''}`
              }
            >
              {item.label}
              {item.hasDropdown && <span className="dropdown-arrow">▼</span>}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="action-btn account-btn" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Account</span>
          </button>
          <button className="action-btn cart-btn" aria-label="Shopping Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>$0.00 (0)</span>
          </button>
        </div>
      </div>
      <div className="store-selector">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>Picking up?</span>
        <select className="store-select">
          <option>Select store</option>
          <option>Taipei Main Store</option>
          <option>Da'an Branch</option>
        </select>
      </div>
    </header>
  );
};

export default SiteHeader;
