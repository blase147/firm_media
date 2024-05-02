import React from 'react';
import './about.scss';
import aboutImage1 from '../images/jpeg/about_img1.jpg';
import aboutImage2 from '../images/jpeg/about_img2.jpg';
import aboutImage3 from '../images/jpeg/about_img3.jpg';

const About = () => (
  <div>
    <div id="about">
      <div id="aboutImage">
        <diV id="side1">
          <img
            className="responsive_image"
            src={aboutImage1}
            alt="aboutImage"
          />
          <img
            className="responsive_image"
            src={aboutImage2}
            alt="aboutImage"
          />
        </diV>
        <div id="side2">
          <img
            className="responsive_image"
            src={aboutImage3}
            alt="aboutImage"
          />
        </div>
      </div>
      <div id="about_text">
        <h5>
          <span>About</span>
          FirmMedia
        </h5>
        <h1>Where Light Meets Lens, Magic Happens</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <button type="button">Discover more</button>
      </div>
    </div>
  </div>
);

export default About;
