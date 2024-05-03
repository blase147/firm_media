import React from 'react';
import './nav.scss';

const Nav = () => (
  <div id="nav_container">
    <div className="logo">
      <img src="https://via.placeholder.com/50" alt="FirmMedia" />
    </div>
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#our_services">Services</a>
        </li>
        <li>
          <a href="#blog_update">Blog</a>
        </li>
        <li>
          <a href="#gallery">Portfolio</a>
        </li>
        <li>
          <a href="https://www.youtube.com">YOUTUBE</a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Nav;
