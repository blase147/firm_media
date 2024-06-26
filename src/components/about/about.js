import React from 'react';
import './about.scss';
import { Link, useLocation } from 'react-router-dom';
import aboutImage1 from '../images/jpeg/about_img1.jpg';
import aboutImage2 from '../images/jpeg/about_img2.jpg';
import aboutImage3 from '../images/jpeg/about_img3.jpg';

const About = () => {
  const location = useLocation();

  // Check if the current pathname is '/aboutDetails'
  const isAboutDetailsPage = location.pathname === '/aboutDetails';

  return (
    <div>
      <div id="about">
        <div className="grid-container">
          <div id="grid1">
            <img
              className="responsive_image"
              src={aboutImage1}
              alt="aboutImage"
            />
            <img
              className="responsive_image"
              src={aboutImage3}
              alt="aboutImage"
            />
          </div>
          <div id="grid2">
            <img
              className="responsive_image"
              src={aboutImage2}
              alt="aboutImage"
            />
          </div>
        </div>
        <div id="about_text" className="h5_h2_p">
          <h5>
            <span>About</span>
            FirmMedia
          </h5>
          <h2>Where Light Meets Lens, Magic Happens</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          {/* Conditionally render the button based on the current pathname */}
          {!isAboutDetailsPage && (
            <Link to="/aboutDetails">
              <button className="button" type="button">
                Discover more
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
