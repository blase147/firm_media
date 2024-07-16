import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/Reducers/authSlice';
import './nav.scss';
import Logo from '../images/png/Logo.png';

const Nav = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('currentUser:', currentUser);

    if (isAuthenticated) {
      navigate('/'); // Redirect to homepage after successful login
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleToggleNavbar = () => {
    setShowNavbar(!showNavbar); // Toggles the value of showNavbar
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div id="nav_container">
      <div>
        <img className="logo" src={Logo} alt="FirmMedia" />
      </div>
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
        {isAuthenticated ? (
          <div>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
            <span>{currentUser?.email}</span>
            {' '}
            {/* Display current user email */}
          </div>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
      <button type="button" className="mobile_breadcrumb" onClick={handleToggleNavbar}>
        &#9776;
      </button>
    </div>
  );
};

export default Nav;
