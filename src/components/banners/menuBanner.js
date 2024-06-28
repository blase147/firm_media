import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/nav';
import './menuBanner.scss';

const MenuBanner = ({
  backgroundImage, socialIcons, welcome, heading, paragraph, button, showButton,
}) => {
  const bannerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh',
  };

  return (
    <div id="banner_cont">
      <div id="MenuBannerContainer">
        <div className="h5_h2_p" style={bannerStyle}>
          <Nav />
          <div id="banner">
            <div id="MenuBannerText">
              <div id="social_icons_container">{socialIcons}</div>
              <div className="h5_h2_p">
                <h5>{welcome}</h5>
                <h1>{heading}</h1>
                <p>{paragraph}</p>
                {showButton && <button className="button" type="button">{button}</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MenuBanner.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  button: PropTypes.string,
  welcome: PropTypes.string.isRequired,
  socialIcons: PropTypes.node,
  showButton: PropTypes.bool,
};

MenuBanner.defaultProps = {
  button: '',
  socialIcons: null,
  showButton: true,
};

export default MenuBanner;
