import React from 'react';
import './about.scss';
import { Link, useLocation } from 'react-router-dom';
import aboutImage1 from '../images/jpeg/about_img1.jpg';
import aboutImage2 from '../images/jpeg/about_img2.jpeg';
import aboutImage3 from '../images/jpeg/about_img3.jpg';

const About = () => {
  const location = useLocation();

  // Check if the current pathname is '/aboutDetails'
  const isAboutDetailsPage = location.pathname === '/aboutDetails';

  return (
    <div>
      <div id="about">
        <div className="grid-container">
          <div className="grid-item grid-left-top">
            <img
              className="responsive_image"
              src={aboutImage1}
              alt="aboutImage1"
            />
          </div>
          <div className="grid-item grid-left-bottom">
            <img
              className="responsive_image"
              src={aboutImage3}
              alt="aboutImage3"
            />
          </div>
          <div className="grid-item grid-right">
            <img
              className="responsive_image"
              src={aboutImage2}
              alt="aboutImage2"
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
            At Firm Media, we are dedicated to turning your visions into
            reality through exceptional visual storytelling. Our team
            of skilled professionals is passionate about capturing and
            creating moments that matter. With a focus on creativity,
            quality, and innovation, we strive to deliver outstanding
            results that exceed your expectations.

            Whether it&apos;s through stunning photography, cinematic videography, or
            advanced post-production techniques, Firm Media is committed to providing
            you with the best in the industry. We believe in the power of visuals to
            tell compelling stories and create lasting impressions. Join us on this
            journey to make your moments unforgettable.
          </p>
          {/* Conditionally render the button based on the current pathname */}
          {!isAboutDetailsPage && (
            <Link to="/aboutDetails">
              <div className="button-container">
                <button className="main-btn" type="button">
                  Discover more
                </button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
