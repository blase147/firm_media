import React from 'react';
import './footer_body.scss';
import { faEnvelope, faPhone, faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import footerImage from '../images/jpeg/footer_image.jpg';
import SocialIcons from '../social icons/social_icons';
import Logo from '../images/png/Logo.png';
import Copyright from './copyright';

const FooterBody = () => {
  const footerImageStyle = {
    backgroundImage: `url(${footerImage})`, // Set the background image dynamically
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  };

  return (
    <div id="footer_body" style={footerImageStyle}>
      <div className="footer_body_content" style={overlayStyle}>
        <div id="footer1">
          {/* Company Info */}
          <div id="company_info" className="footer1_item">
            <img src={Logo} alt="company-logo" />
            <p>
              FirmMedia is a full-service digital marketing agency that
              specializes in providing digital marketing solutions to small and
              medium-sized businesses.
            </p>
          </div>

          {/* Services */}
          <div id="footer1_services" className="footer1_item">
            <h3>Services</h3>
            <ul>
              <li>Photography</li>
              <li>Videography</li>
              <li>Drone Shot</li>
              <li>Studio Photo</li>
              <li>Equipment Rental</li>
              <li>Post Production</li>
            </ul>
          </div>

          {/* About Us with Links */}
          <div id="footer1_about" className="footer1_item">
            <h3>About Us</h3>
            <ul>
              <li>
                <Link to="/aboutDetails">About Us</Link>
              </li>
              <li>
                <Link to="/team">Our Team</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div id="footer1_contact" className="footer1_item">
            <h3>Company Info</h3>
            <div>
              <p>
                <FontAwesomeIcon icon={faEnvelope} />
                {' '}
                <span>Email: info@gmt.com</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} />
                {' '}
                <span>Phone: +234 803 534 4730</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faLocation} />
                {' '}
                <span>
                  Block 4, World Bank, Plot 4, Area A Sam MbaKwe Ave,
                  beside Dreamland Hotel, New Owerri, Owerri West 046000,
                  Owerri 460000, Imo
                </span>
              </p>
            </div>
            <SocialIcons />
          </div>
        </div>

        {/* Footer Disclaimer and Copyright */}
        <div id="copyright">
          <Copyright />
          <div id="disclaimer">
            <Link to="/disclaimer">Disclaimer</Link>
            {' | '}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBody;
