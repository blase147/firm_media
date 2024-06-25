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
import BlogUpdate from '../blogUpdate/blog_update';
import FooterBody from '../footer body/footer_body';
import Newsletter from '../newsletter/newsletter';

const Homepage = () => (
  <div id="homepage_container">
    <Banner />
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
    <Newsletter />
    <FooterBody />
    {/* </div> */}
  </div>
);

export default Homepage;
