import React from 'react';
import './contact.scss';
import { faAddressBook, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuBanner from '../banners/menuBanner';
import aboutDetailsBanner from '../images/jpeg/homepage_banner.jpg';
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
      paragraph="FirmtecsMedia Production is a media production company
        that specializes in photography and videography. We are dedicated
        to capturing your special moments and making them last a lifetime.
        Our team of skilled photographers videographers will work with you
        to create stunning images and videos that you can cherish forever.
        Whether you're planning a wedding, a corporate event, or a family
        photoshoot, we have the expertise and equipment to bring your
        vision to life. Contact us today to learn more about our services
        and how we can help you capture your moments in style."
      showButton={false} // Do not show button on this page
    />
    <div id="contact">
      <div id="contact_text">
        <h5>Contact Us</h5>
        <h2>Ready to Frame Your Moments? Reach Out Today!</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation.
        </p>
        <SocialIcons />
      </div>
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
