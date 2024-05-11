import React from 'react';
import './our_services.scss';
import serviceImage1 from '../images/jpeg/service_image1.jpg';

const OurServices = () => (
  <div>
    <div id="our_services">
      <div id="our_sercices_text">
        <div>
          <h5>
            <span>Our</span>
            Services
          </h5>
          <h1>What We Can Provide</h1>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </p>
        </div>
      </div>
      <div id="our_services_card_container">
        <div className="our_services_item">
          <img
            className="responsive_image"
            src={serviceImage1}
            alt="our_services"
          />
          <h3>Photography</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </p>
        </div>
        <div className="our_services_item">
          <img
            className="responsive_image"
            src={serviceImage1}
            alt="our_services"
          />
          <h3>Videography</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </p>
        </div>
        <div className="our_services_item">
          <img
            className="responsive_image"
            src={serviceImage1}
            alt="our_services"
          />
          <h3>Drone Shoot</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </p>
        </div>
        <div className="our_services_item">
          <img
            className="responsive_image"
            src={serviceImage1}
            alt="our_services"
          />
          <h3>Studio Shoot</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </p>
        </div>
        <div className="our_services_item">
          <img
            className="responsive_image"
            src={serviceImage1}
            alt="our_services"
          />
          <h3>Equipment Rent</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </p>
        </div>
        <div className="our_services_item">
          <img
            className="responsive_image"
            src={serviceImage1}
            alt="our_services"
          />
          <h3>Post-Production</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default OurServices;
