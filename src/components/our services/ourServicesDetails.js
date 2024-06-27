import React from 'react';
import './ourServicesDetails.scss';
import OurServices from './our_services';
import FooterBody from '../footer body/footer_body';
import HireUs from '../hire us/hire_us';
import Testimonials from '../testimonials/testimonials';
import MenuBanner from '../banners/menuBanner';
import OurServicesDetailsBanner from '../images/jpeg/services_banner.avif';
import GalleryPage from '../gallery/galleryPage';
import NewsLetter from '../newsletter/newsletter';

const OurServicesDetails = () => (
  <div id="OurServicesDetailsContainer">
    <MenuBanner
      backgroundImage={OurServicesDetailsBanner}
      heading="Services"
      paragraph="Discover excellence in visual storytelling with Firm Media.
       From expert photography and videography to dynamic drone shoots and
        professional studio sessions, we offer comprehensive solutions tailored
         to your creative needs. Elevate your projects with our reliable equipment
          leasing and meticulous post-production services. Explore our diverse range
           of services and bring your vision to life with Firm Media."
      showButton={false} // Do not show button on this page
    />
    <OurServices />
    <HireUs />
    <Testimonials />
    <GalleryPage />
    <NewsLetter />
    <FooterBody />
  </div>
);

export default OurServicesDetails;
