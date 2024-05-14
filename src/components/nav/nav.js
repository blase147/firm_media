import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <div id="nav_container">
      <div className="logo">
        <img src="https://via.placeholder.com/50" alt="FirmMedia" />
      </div>
      <Nav className={isMobileMenuOpen ? 'mobile-menu-open' : ''}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/aboutDetails">About</Link>
          </li>
          <li>
            <Link to="/ourServicesDetails">Services</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
        </ul>
      </Nav>
      <button type="button" className="mobile-menu-breadcrumb" onClick={toggleMobileMenu}>
        &#9776;
      </button>
    </div>
  );
};

export default Nav;
