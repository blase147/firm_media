import React from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div id="nav_container">
    <div className="logo">
      <img src="https://via.placeholder.com/50" alt="FirmMedia" />
    </div>
    <nav>
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
        <li>
          <Link to="/bookNow">
            <button className="button" type="button">Book Now</button>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Nav;
