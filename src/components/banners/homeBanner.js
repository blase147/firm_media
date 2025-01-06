import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/nav';
import './homeBanner.scss';

const HomeBanner = ({
  backgroundImage, socialIcons, welcome, heading, paragraph, button, showButton,
}) => {
  const bannerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // height: '70vh',
    margin: '0',
  };

  return (
    <div id="banner_cont">
      <div id="HomeBannerContainer" style={bannerStyle}>
        <div>
          <Nav />
          <div>
            <div id="banner">
              <div id="HomeBannerText">
                <div id="social_icons_container">{socialIcons}</div>
                <div>
                  <h5>{welcome}</h5>
                  <h1>{heading}</h1>
                  <p>{paragraph}</p>
                  <div className="button-container">
                    {showButton && <button className="main-btn" type="button">{button}</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HomeBanner.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  button: PropTypes.string,
  welcome: PropTypes.string.isRequired,
  socialIcons: PropTypes.node,
  showButton: PropTypes.bool,
};

HomeBanner.defaultProps = {
  button: '',
  socialIcons: null,
  showButton: true,
};

export default HomeBanner;
