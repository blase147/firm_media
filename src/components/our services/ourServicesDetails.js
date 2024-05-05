import React from 'react';
import './ourServicesDetails.scss';
import OurServices from './our_services';
import FooterBody from '../footer body/footer_body';
import HireUs from '../hire us/hire_us';
import Testimonials from '../testimonials/testimonials';
import MenuBanner from '../banners/menuBanner';
import OurServicesDetailsBanner from '../images/jpeg/homepage_banner.jpg';
import GalleryPage from '../gallery/galleryPage';

const OurServicesDetails = () => (
  <div id="OurServicesDetailsContainer">
    <MenuBanner
      backgroundImage={OurServicesDetailsBanner}
      heading="Services"
      paragraph="FirmtecsMedia Production is a media production company
    that specializes in photography and videography. We are dedicated
    to capturing your special moments and making them last a lifetime.
     Our team of skilled photographers videographers will work with you
     to create stunning images and videos that you can cherish forever.
     Whether you're planning a wedding, a corporate event, or a family
      photoshoot, we have the expertise and equipment to bring your
      vision to life. Contact us today to learn more about our services
      and how we can help you capture your moments in style."
    />
    <OurServices />
    <HireUs />
    <Testimonials />
    <GalleryPage />
    <FooterBody />
  </div>
);

export default OurServicesDetails;
