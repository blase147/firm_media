import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './nav.scss';
import Logo from '../images/png/Logo.png';

const Nav = () => {
  // State to manage the visibility of the navbar
  const [showNavbar, setShowNavbar] = useState(false);

  // Function to toggle the navbar visibility
  const handleToggleNavbar = () => {
    setShowNavbar(!showNavbar); // Toggles the value of showNavbar
  };

  return (
    <div id="nav_container">
      <div className="logo">
        <img src={Logo} alt="FirmMedia" />
      </div>
      {/* Add conditional class based on showNavbar state */}
      <nav className={`navbar ${showNavbar ? 'show' : 'close'}`}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/aboutDetails">About</NavLink>
          </li>
          <li>
            <NavLink to="/ourServicesDetails">Services</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/portfolio">Portfolio</NavLink>
          </li>
        </ul>
      </nav>
      {/* Button to toggle the navbar visibility */}
      <button type="button" className="mobile_breadcrumb" onClick={handleToggleNavbar}>
        &#9776;
      </button>
    </div>
  );
};

export default Nav;
