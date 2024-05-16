import React from 'react';
import './footer_body.scss';
import footerImage from '../images/jpeg/footer_image.jpg';
import SocialIcons from '../social icons/social_icons';
import Logo from '../images/png/Logo.png';
// import Newsletter from '../newsletter/newsletter';
// import '../newsletter/newsletter.scss';

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
            <p>solarmails2@gmail.com</p>
            <p>+2348035344730</p>
            <p>City, State, Zip</p>
            <SocialIcons />
          </div>
        </div>
        <div id="copyright">
          <p>© 2021 FirmMedia. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default FooterBody;
