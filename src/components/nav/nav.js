import React from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div id="nav_container">
    <div className="logo">
      <img src="https://via.placeholder.com/50" alt="FirmMedia" />
    </div>
    <Nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/aboutDetails">About</a>
        </li>
        <li>
          <Link to="/ourServicesDetails">Services</Link>
        </li>
        <li>
          <a href="#blog_update">Blog</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/pricing">Pricing</a>
        </li>
        <li>
          <a href="/portfolio">Portfolio</a>
        </li>
        <li>
          <button className="button" type="button">Book Now</button>
        </li>
      </ul>
    </Nav>
  </div>
);

export default Nav;
