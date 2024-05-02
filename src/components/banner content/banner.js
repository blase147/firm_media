import React from 'react';
import './banner.scss';
import homepageBanner from '../images/jpeg/homepage_banner.jpg';
import SocialIcons from '../social icons/social_icons';

const Banner = () => {
  const bannerStyle = {
    backgroundImage: `url(${homepageBanner})`, // Set the background image dynamically
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '70vh',
  };
  return (
    <div id="banner_cont">
      <div id="banner" style={bannerStyle}>
        <div>
          {/* <img className="responsive_image" src={homepageBanner} alt="banner" /> */}
        </div>
        <div className="banner_text">
          <div id="social_icons_container">
            <SocialIcons />
          </div>
          <div>
            <h5>Welcome to FirmtecsMedia Production</h5>
            <h1>Through Our Lens, Your Moments Shine</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              pretium justo at odio dignissim, auctor vesti bulum dui maximus.
              Integer tristique porttitor urna accumsan egestas. Vestibulum
              imperdiet fermentum nunc, nec efficitur massa tempus ut.
            </p>
            <button type="button">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
