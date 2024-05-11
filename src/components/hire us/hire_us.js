import React from 'react';
import './hire_us.scss';
import { Link } from 'react-router-dom';
import hireUsImage from '../images/jpeg/hire_us_image.jpg';

const HireUs = () => {
  const hireUsImageStyle = {
    backgroundImage: `url(${hireUsImage})`, // Set the background image dynamically
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    maxWidth: '100%',
    height: '80vh',
  };
  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: '100%',
    // width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div id="hire_us_container" style={hireUsImageStyle}>
      <div id="hire_us" style={overlayStyle}>
        <div id="hire_us_text">
          <h5>
            <span>Hire Us</span>
            Now
          </h5>
          <h1>Book Our Services and Capture Your Memories for a Lifetime</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <Link to="/bookNow">
            <button className="button" type="button">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HireUs;
