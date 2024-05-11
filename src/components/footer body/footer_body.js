import React from 'react';
import './footer_body.scss';
import footerImage from '../images/jpeg/footer_image.jpg';
// import Newsletter from '../newsletter/newsletter';
// import '../newsletter/newsletter.scss';

const FooterBody = () => {
  const footerImageStyle = {
    backgroundImage: `url(${footerImage})`, // Set the background image dynamically
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '113vh',
  };
  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div id="footer_body" style={footerImageStyle}>
      <div className="footer_body_content" style={overlayStyle}>
        {/* <div id="newsletter">
          <Newsletter />
        </div> */}
        <div id="footer1">
          <div id="company_info" className="footer1_item">
            <h2>FirmMedia</h2>
            <p>
              FirmMedia is a full-service digital marketing agency that
              specializes in providing digital marketing solutions to small and
              medium-sized businesses.
            </p>
          </div>
          <div id="footer1_services" className="footer1_item">
            <h2>Services</h2>
            <ul>
              <li>Web Design</li>
              <li>SEO</li>
              <li>PPC</li>
              <li>Social Media</li>
              <li>Content Marketing</li>
              <li>Reputation Management</li>
              <li>Local SEO</li>
              <li>Video Marketing</li>
              <li>Mobile Marketing</li>
            </ul>
          </div>
          <div id="footer1_about" className="footer1_item">
            <h2>About</h2>
            <ul>
              <li>Our Team</li>
              <li>Our Work</li>
              <li>Our Process</li>
              <li>Our Blog</li>
              <li>Our Services</li>
              <li>Our Clients</li>
              <li>Our Contact</li>
            </ul>
          </div>
          <div id="footer1_contact" className="footer1_item">
            <h2>Company Info</h2>
            <p>Company Name</p>
            <p>Address</p>
            <p>City, State, Zip</p>
            <p>Phone</p>
            <p>Email</p>
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
