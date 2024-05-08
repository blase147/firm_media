import React from 'react';
import './social_icons.scss'; // Import your SCSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Import Font Awesome icons

const SocialIcons = () => {
  const socialMediaPlatforms = [
    {
      name: 'Facebook',
      icon: faFacebookF, // Font Awesome Facebook icon
      url: 'https://facebook.com',
    },
    {
      name: 'Twitter',
      icon: faTwitter, // Font Awesome Twitter icon
      url: 'https://twitter.com',
    },
    {
      name: 'Instagram',
      icon: faInstagram, // Font Awesome Instagram icon
      url: 'https://instagram.com',
    },
  ];

  return (
    <div className="social-icons">
      {socialMediaPlatforms.map((platform) => (
        <a key={platform.name} href={platform.url} className="social-icon">
          {/* Render the Font Awesome icon */}
          <FontAwesomeIcon icon={platform.icon} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
