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
      paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium justo at odio dignissim, auctor vestibulum dui maximus. Integer tristique porttitor urna accumsan egestas. Vestibulum imperdiet fermentum nunc, nec efficitur massa tempus ut."
      button="Get Started"
      showButton // Show button on this page
    />
  </div>
);

export default Banner;
