import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/nav';
import './menuBanner.scss';

const MenuBanner = ({ backgroundImage, heading, paragraph }) => {
  const bannerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '70vh',
  };

  return (
    <div id="MenuBannerContainer">
      <div id="MenuBanner" style={bannerStyle}>
        <Nav />
        <div id="MenuBannerText">
          <h1>{heading}</h1>
          <p>{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

MenuBanner.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};

export default MenuBanner;
