import React from 'react';
import './contact.scss';
import { faAddressBook, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuBanner from '../banners/menuBanner';
import aboutDetailsBanner from '../images/jpeg/contact_banner.jpg';
import SocialIcons from '../social icons/social_icons';
import Newsletter from '../newsletter/newsletter';
import FooterBody from '../footer body/footer_body';
import GoogleMapComponent from '../GoogleMapComponent';
import LeafletMapComponent from '../LeafletMapComponent';

const Contact = () => (
  <div id="contactContainer">
    <MenuBanner
      backgroundImage={aboutDetailsBanner}
      heading="Contact Us"
      paragraph="Reach out to Firm Media today and let's start creating something
       extraordinary together. Whether you have questions about our services or
        want to discuss your next project, we're here to help. Contact us now and
         let's bring your vision to life."
      showButton={false} // Do not show button on this page
    />
    <div id="contact">
      <div id="contact_text">
        <h5>
          <span>Contact</span>
          {' '}
          Us
        </h5>
        <h2>Ready to Frame Your Moments? Reach Out Today!</h2>
        <p>
          Have questions or ready to start your next project? Reach out to
          Firm Media today! Our team is here to assist with all your photography,
          videography, drone shoot, studio session, equipment leasing, and post-production
          needs. Connect with us to discuss how we can bring your vision to life.
        </p>
        <SocialIcons />
      </div>
      <div className="form">
        <form>
          <input className="input" id="name" type="text" placeholder="Name" />
          <div>
            <input
              className="input"
              id="email"
              type="email"
              placeholder="Email"
            />
            <input
              className="input"
              id="phone"
              type="text"
              placeholder="Mobile Phone"
            />
          </div>
          <input
            className="input"
            id="subject"
            type="text"
            placeholder="How can we help you?"
          />
          <textarea className="textarea" placeholder="Comments" />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
    <div id="contactCardContainer">
      <div id="contactCardContent">
        <div className="contactCard">
          <h3>
            <span>
              <FontAwesomeIcon className="icon_label" icon={faAddressBook} />
              Office Location
            </span>
          </h3>
          <hr />
          <p>286 King Roman, New York</p>
        </div>
        <div className="contactCard">
          <h3>
            <span>
              <FontAwesomeIcon className="icon_label" icon={faPhone} />
              Call Center
            </span>
          </h3>
          <hr />
          <p>08035344730</p>
        </div>
        <div className="contactCard">
          <h3>
            <span>
              <FontAwesomeIcon className="icon_label" icon={faEnvelope} />
              Mail Us
            </span>
          </h3>
          <hr />
          <p>solarmails2@gmail.com</p>
        </div>
      </div>
      <div className="map_container">
        <LeafletMapComponent />
      </div>
      <GoogleMapComponent />
    </div>
    <Newsletter />
    <FooterBody />
  </div>
);

export default Contact;
