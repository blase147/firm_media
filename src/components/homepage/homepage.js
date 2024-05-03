import React from 'react';
import './homepage.scss';
import Banner from '../banner content/banner';
import About from '../about/about';
import OurRecord from '../our record/our_record';
import OurServices from '../our services/our_services';
import WhyChooseUs from '../why choose us/why_choose_us';
import Partners from '../partners/partners';
import PortfolioVideos from '../portfolio videos/portfolio_videos';
import Gallery from '../gallery/gallery';
import Testimonials from '../testimonials/testimonials';
import HireUs from '../hire us/hire_us';
import BlogUpdate from '../blog update/blog_update';
import FooterBody from '../footer body/footer_body';

const Homepage = () => (
  <div id="homepage_container">
    <div>
      <div>
        <Banner />
      </div>
      {' '}
      <About />
      <OurRecord />
      <OurServices />
      <WhyChooseUs />
      <Partners />
      <PortfolioVideos />
      <Gallery />
      <Testimonials />
      <HireUs />
      <BlogUpdate />
      <FooterBody />
    </div>
  </div>
);

export default Homepage;
