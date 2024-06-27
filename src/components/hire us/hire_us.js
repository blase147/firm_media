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
    // height: '80vh',
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
        <div className="h5_h2_p">
          <h5>
            <span>Hire Us</span>
            Now
          </h5>
          <h2>Book Our Services and Capture Your Memories for a Lifetime</h2>
          <p>
            Ready to elevate your visual projects? Firm Media stands ready to
            bring your ideas to life. Whether you need expert photography, dynamic
            videography, precise drone shots, or a professional studio environment,
            we&apos;ve got you covered. Our team offers flexible equipment leasing and
            meticulous post-production services to ensure your vision exceeds expectations.
            Contact us today to start collaborating on your next creative endeavor.
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
