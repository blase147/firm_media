import React from 'react';
import './banner.scss';
import homepageBanner from '../images/jpeg/homepage_banner.jpg';
import SocialIcons from '../social icons/social_icons';
import HomeBanner from '../banners/homeBanner';

const Banner = () => (
  <div id="banner_cont">
    <HomeBanner
      backgroundImage={homepageBanner}
      socialIcons={<SocialIcons />}
      welcome={(
        <>
          <span>Welcome</span>
          {' '}
          to FirmtecsMedia
        </>
)}
      heading="Through Our Lens, Your Moments Shine"
      paragraph="At Firm Media, we specialize in capturing
       your most precious moments with professional artistry
        and precision. Whether you're looking for stunning
        photography, cinematic videography, breathtaking drone
         shoots, or intimate studio shoots, we’ve got you covered.
         Enhance your projects with our top-tier equipment leasing
         services and impeccable post-production work. Trust Firm
         Media to bring your vision to life!"
      button="Get Started"
      showButton // Show button on this page
    />
  </div>
);

export default Banner;
