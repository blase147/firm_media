import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon
import { logout, fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import './nav.scss';
import Logo from '../images/png/Logo.png';

const Nav = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.loggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser()); // Fetch the user details after authentication
    }
  }, [dispatch, isAuthenticated]);

  const handleToggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleAdminDashboardRedirect = () => {
    navigate('/adminDashboard');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  let navContent;
  if (isLoading) {
    navContent = <span>Loading...</span>;
  } else if (isAuthenticated && currentUser) {
    navContent = (
      <div className="profile-container">
        <div
          className="profile-icon-wrapper"
          role="button"
          tabIndex={0}
          onClick={toggleDropdown}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleDropdown();
          }}
          aria-label="Open Profile Menu"
        >
          <FaUserCircle className="profile-icon" />
        </div>

        {showDropdown && (
          <div className="dropdown-card">
            <p><strong>{currentUser?.email || 'User'}</strong></p>
            {currentUser?.role === 'admin' && (
              <button
                type="button"
                onClick={handleAdminDashboardRedirect}
                className="dropdown-button"
              >
                Admin Dashboard
              </button>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="dropdown-button logout"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  } else {
    navContent = (
      <>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </>
    );
  }

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
      <div>{navContent}</div>
      <button
        type="button"
        className="mobile_breadcrumb"
        onClick={handleToggleNavbar}
      >
        &#9776;
      </button>
    </div>
  );
};

export default Nav;
