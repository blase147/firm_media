import React from 'react';
import './our_services.scss';
import photography from '../images/jpeg/photography.jpg';
import videography from '../images/jpeg/videography.jpg';
import drone from '../images/jpeg/drone.jpg';
import studioShoot from '../images/jpeg/studio_shoot.webp';
import equipment from '../images/jpeg/equipment.jpeg';
import postProduction from '../images/jpeg/post_production.png';

const OurServices = () => (
  <div id="our_services">
    <div id="our_sercices_text">
      <div className="h5_h2_p">
        <h5>
          <span>Our</span>
          Services
        </h5>
        <h2>What We Can Provide</h2>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut
      </p>
    </div>
    <div id="our_services_card_container">
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={photography}
          alt="our_services"
        />
        <h3>Photography</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={videography}
          alt="our_services"
        />
        <h3>Videography</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={drone}
          alt="our_services"
        />
        <h3>Drone Shoot</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={studioShoot}
          alt="our_services"
        />
        <h3>Studio Shoot</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={equipment}
          alt="our_services"
        />
        <h3>Equipment Rent</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={postProduction}
          alt="our_services"
        />
        <h3>Post-Production</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
    </div>
  </div>
);

export default OurServices;
