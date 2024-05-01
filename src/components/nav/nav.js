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
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/portfolio">Portfolio</a>
        </li>
        <li>
          <a href="/youtube">YOUTUBE</a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Nav;
