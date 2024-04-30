import React from "react";
import "./banner.scss";
import homepage_banner from "../images/jpeg/homepage_banner.jpg";
import SocialIcons from "../social icons/social_icons";

const Banner = () => (
  <div>
    <div id="banner">
      <div id="social_icons_container">
        <SocialIcons />
      </div>
      <img src={homepage_banner} alt="banner" />
      <div id="banner_text">
        <h5>Welcome to FirmtecsMedia Production</h5>
        <h1>Through Our Lens, Your Moments Shine</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium
          justo at odio dignissim, auctor vesti bulum dui maximus. Integer
          tristique porttitor urna accumsan egestas. Vestibulum imperdiet
          fermentum nunc, nec efficitur massa tempus ut.
        </p>
      </div>
      <button>Get Started</button>
    </div>
  </div>
);

export default Banner;
