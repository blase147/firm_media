import React from 'react';
import './pricing.scss';
import MenuBanner from '../banners/menuBanner';
import PricingBanner from '../images/jpeg/services_banner.avif';
import FooterBody from '../footer body/footer_body';
import NewsLetter from '../newsletter/newsletter';
import Testimonials from '../testimonials/testimonials';
import CameraLens from '../images/jpeg/camera_lens.jpg';
import Camera from '../images/jpeg/camera.jpeg';
import Drone from '../images/jpeg/drone.jpg';
import VideoLight from '../images/jpeg/video_light.webp';

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
            100,000
            <span>/session</span>
          </h2>
        </div>
        <ul>
          <li>1 hour session</li>
          <li>10 Photos</li>
          <li>1 Photos/Video Editing</li>
          <li>Digital files</li>
        </ul>
        <button type="button" className="button">Book</button>
      </div>
      <div className="price_card">
        <div className="price">
          <h3>Regular</h3>
          <h2>
            <span className="currency">N</span>
            150,000
            <span>/session</span>
          </h2>
        </div>
        <ul>
          <li>3 hour session</li>
          <li>25 Photos</li>
          <li>1 Photos/Video Editing</li>
          <li>Digital files</li>
        </ul>
        <button type="button" className="button">Book</button>
      </div>
      <div className="price_card">
        <div className="price">
          <h3>Premium</h3>
          <h2>
            <span className="currency">N</span>
            200,000
            <span>/session</span>
          </h2>
        </div>
        <ul>
          <li>4 hour session</li>
          <li>35 Photos</li>
          <li>1 Photos/Video Editing</li>
          <li>Digital files</li>
        </ul>
        <button type="button" className="button">Book</button>
      </div>
      <div className="price_card">
        <div className="price">
          <h3>Platinum</h3>
          <h2>
            <span className="currency">N</span>
            250,000
            <span>/session</span>
          </h2>
        </div>
        <ul>
          <li>Unlimitd Time</li>
          <li>Unlimitd Photos</li>
          <li>Photos/Video Editing</li>
          <li>Digital Files</li>
        </ul>
        <button type="button" className="button">Book</button>
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
      <div className="equipment_card">
        <img src={CameraLens} alt="Equipment" />
        <div className="equipment_price_per_hour">
          <h3>Camera Lens</h3>
          <h4>
            <span className="currency">N</span>
            1000
            <span>/hour</span>
          </h4>
        </div>
        <div className="equipment_description">
          <ul>
            <li>Camera Lens</li>
            <li>Aperture: f/1.4</li>
            <li>Focus: 50mm</li>
            <li>Weight: 1.3 lbs</li>
          </ul>
        </div>
        <div className="rent">
          <button type="button" className="button">Rent</button>
        </div>
      </div>
      <div className="equipment_card">
        <img src={Camera} alt="Equipment" />
        <div className="equipment_price_per_hour">
          <h3>Camera</h3>
          <h4>
            <span className="currency">N</span>
            1000
            <span>/hour</span>
          </h4>
        </div>
        <div className="equipment_description">
          <ul>
            <li>SkySense Sky Recognition</li>
            <li>QuantumSpeed Burst Shooting</li>
            <li>AutoZoom Smart Framing</li>
            <li>MoonlightCapture Night Mode</li>
          </ul>
        </div>
        <div className="rent">
          <button type="button" className="button">Rent</button>
        </div>
      </div>
      <div className="equipment_card">
        <img src={Drone} alt="Equipment" />
        <div className="equipment_price_per_hour">
          <h3>Drone</h3>
          <h4>
            <span className="currency">N</span>
            1000
            <span>/hour</span>
          </h4>
        </div>
        <div className="equipment_description">
          <ul>
            <li>SkyView 360° Panoramic Capture</li>
            <li>SkyLink HD Live Streaming</li>
            <li>FlightSteady Gyro Stabilization</li>
            <li>SkyTrack Object Tracking</li>
          </ul>
        </div>
        <div className="rent">
          <button type="button" className="button">Rent</button>
        </div>
      </div>
      <div className="equipment_card">
        <img src={VideoLight} alt="Equipment" />
        <div className="equipment_price_per_hour">
          <h3>Video Light</h3>
          <h4>
            <span className="currency">N</span>
            1000
            <span>/hour</span>
          </h4>
        </div>
        <div className="equipment_description">
          <ul>
            <li>Variegated Colours</li>
            <li>4 Hours Battery Span</li>
            <li>Rechargable</li>
            <li>Portable</li>
          </ul>
        </div>
        <div className="rent">
          <button type="button" className="button">Rent</button>
        </div>
      </div>

    </div>
    <Testimonials />
    <NewsLetter />
    <FooterBody />
  </div>
);

export default Pricing;
