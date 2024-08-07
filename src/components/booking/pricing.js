import React from 'react';
import './pricing.scss';
import { Link } from 'react-router-dom';
import MenuBanner from '../banners/menuBanner';
import PricingBanner from '../images/jpeg/pricing.jpg';
import FooterBody from '../footer body/footer_body';
import NewsLetter from '../newsletter/newsletter';
import Testimonials from '../testimonials/testimonials';
// import CameraLens from '../images/jpeg/camera_lens.jpg';
// import Camera from '../images/jpeg/camera.jpeg';
// import Drone from '../images/jpeg/drone.jpg';
// import VideoLight from '../images/jpeg/video_light.webp';
import GearsList from '../rent/gearList';

const Pricing = () => (
  <div id="pricing">
    <MenuBanner
      backgroundImage={PricingBanner}
      heading="Pricing"
      paragraph="Welcome to Firm Media's Pricing, where we dive deep into
       the world of visual storytelling, photography tips, videography
        techniques, and industry trends. Stay informed, inspired, and
         discover new perspectives in the realm of visual arts and media.
          Join us on a journey of creativity and knowledge sharing."
      showButton={false} // Do not show button on this page
    />
    <div id="pricingText">
      <div>
        <h5>
          <span>Pricing</span>
          Packages
        </h5>
        <h3>Tailor Your Vision, Let Our Packages Guide You</h3>
      </div>
      <div>
        <p>
          Whether you&apos;re planning a wedding, a corporate event, or a family
          photoshoot, we have the expertise and equipment to bring your vision
          to life. Contact us today to learn more about our services and how we
          can help you capture your moments in style.
        </p>
      </div>
    </div>
    <div id="price_card_container">
      <div className="price_card">
        <div className="price">
          <h3>Basic</h3>
          <h2>
            <span className="currency">N</span>
            15,000
            <span>/session</span>
          </h2>
        </div>
        <ul>
          <li>1 hour session</li>
          <li>10 Photos</li>
          <li>Photos/Video Editing</li>
          <li>Digital files</li>
        </ul>
        <Link to="/booking_form">
          <button type="button" className="button">Book</button>
        </Link>
      </div>
      <div className="price_card">
        <div className="price">
          <h3>Regular</h3>
          <h2>
            <span className="currency">N</span>
            25,000
            <span>/session</span>
          </h2>
        </div>
        <ul>
          <li>3 hour session</li>
          <li>25 Photos</li>
          <li>Photos/Video Editing</li>
          <li>Digital files</li>
        </ul>
        <Link to="/booking_form">
          <button type="button" className="button">Book</button>
        </Link>
      </div>
      <div className="price_card">
        <div className="price">
          <h3>Premium</h3>
          <h2>
            <span className="currency">N</span>
            50,000
            <span>/session</span>
          </h2>
        </div>
        <ul>
          <li>4 hour session</li>
          <li>35 Photos</li>
          <li>Photos/Video Editing</li>
          <li>Digital files</li>
        </ul>
        <Link to="/booking_form">
          <button type="button" className="button">Book</button>
        </Link>
      </div>
      <div className="price_card">
        <div className="price">
          <h3>Platinum</h3>
          <h2>
            <span className="currency">N</span>
            200,000
            <span>/session</span>
          </h2>
        </div>
        <ul>
          <li>Unlimited Time</li>
          <li>Unlimited Photos</li>
          <li>Photos/Video Editing</li>
          <li>Digital Files</li>
        </ul>
        <Link to="/booking_form">
          <button type="button" className="button">Book</button>
        </Link>
      </div>
    </div>
    <div id="equipmentText">
      <div>
        <h5>
          <span>Equipment</span>
          Rental
        </h5>
        <h3>Elevate Your Work With Our Equipments</h3>
      </div>
      <div>
        <p>
          Whether you&apos;re planning a wedding, a corporate event, or a family
          photoshoot, we have the expertise and equipment to bring your vision
          to life. Contact us today to learn more about our services and how we
          can help you capture your moments in style.
        </p>
      </div>
    </div>
    <div id="equipment_card_container">
      <GearsList />
    </div>
    <Testimonials />
    <NewsLetter />
    <FooterBody />
  </div>
);

export default Pricing;
