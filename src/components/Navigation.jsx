import React from 'react';
import { Leaf } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { key: 'home', label: 'Home' },
    { key: 'recommend', label: 'Recommend' },
    { key: 'about', label: 'About' },
    { key: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Leaf size={32} color="#16a34a" />
          <span className="nav-logo-text">AgroDecide</span>
        </div>
        
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setCurrentPage(item.key)}
                className={`nav-button ${currentPage === item.key ? 'active' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;