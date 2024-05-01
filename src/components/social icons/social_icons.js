import React from 'react';
import './social_icons.scss';
import facebook from '../images/png/Facebook Circled.png';
import instagram from '../images/png/Instagram Circle.png';

const SocialIcons = () => (
  <div>
    <div id="social_icons">
      <img src={facebook} alt="facebook" />
      <img src={instagram} alt="instagram" />
    </div>
  </div>
);

export default SocialIcons;
