import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../Redux/Reducers/authSlice'; // Adjust the path as per your project structure
import './nav.scss';
import Logo from '../images/png/Logo.png';

const Nav = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const currentUser = useSelector((state) => state.auth.currentUser);

  // Function to toggle the navbar visibility
  const handleToggleNavbar = () => {
    setShowNavbar(!showNavbar); // Toggles the value of showNavbar
  };

  // Function to handle login (dispatching login action)
  const handleLogin = () => {
    // Replace with actual login logic
    dispatch(login({ username: 'exampleUser', password: 'examplePassword' }));
  };

  // Function to handle logout (dispatching logout action)
  const handleLogout = () => {
    // Replace with actual logout logic
    dispatch(logout());
  };

  return (
    <div id="nav_container">
      <div>
        <img className="logo" src={Logo} alt="FirmMedia" />
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
      <div>
        {/* Conditional rendering for Signup/Login or Logout */}
        {isAuthenticated ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login" onClick={handleLogin}>
              Login
            </Link>
          </>
        )}
      </div>
      {/* Button to toggle the navbar visibility */}
      <button type="button" className="mobile_breadcrumb" onClick={handleToggleNavbar}>
        &#9776;
      </button>
    </div>
  );
};

export default Nav;
