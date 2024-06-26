import React from 'react';
import './footer_body.scss';
import { faEnvelope, faPhone, faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import footerImage from '../images/jpeg/footer_image.jpg';
import SocialIcons from '../social icons/social_icons';
import Logo from '../images/png/Logo.png';
import Copyright from './copyright';

const FooterBody = () => {
  const footerImageStyle = {
    backgroundImage: `url(${footerImage})`, // Set the background image dynamically
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // height: '113vh',
  };
  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // height: '100%',
    // width: '100%',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
  };

  return (
    <div id="footer_body" style={footerImageStyle}>
      <div className="footer_body_content" style={overlayStyle}>
        {/* <div id="newsletter">
          <Newsletter />
        </div> */}
        <div id="footer1">
          <div id="company_info" className="footer1_item">
            <img src={Logo} alt="company-logo" />
            <p>
              FirmMedia is a full-service digital marketing agency that
              specializes in providing digital marketing solutions to small and
              medium-sized businesses.
            </p>
          </div>
          <div id="footer1_services" className="footer1_item">
            <h3>Services</h3>
            <ul>
              <li>Photogrphy</li>
              <li>Videography</li>
              <li>Drone Shot</li>
              <li>Studio Photo</li>
              <li>Equipment Rental</li>
              <li>Post Production</li>
            </ul>
          </div>
          <div id="footer1_about" className="footer1_item">
            <h3>About Us</h3>
            <ul>
              <li>About Us</li>
              <li>Our Team</li>
              <li>Contact Us</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div id="footer1_contact" className="footer1_item">
            <h3>Company Info</h3>
            <div>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Email: example@example.com</span>
              <br />
              <FontAwesomeIcon icon={faPhone} />
              <span>Phone: +1234567890</span>
              <br />
              <FontAwesomeIcon icon={faLocation} />
              <span>286 King Roman, New York</span>
            </div>
            <SocialIcons />
          </div>
        </div>
        <div id="copyright">
          <Copyright />
          <div>
            <p>Disclaimer</p>
            |
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBody;
