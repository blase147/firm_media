import React from 'react';
import PropTypes from 'prop-types'; // Add prop-types import
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlidingGallery = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: images.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
  };

  return (
    <div>
      <Slider
        dots={settings.dots}
        infinite={settings.infinite}
        speed={settings.speed}
        slidesToShow={settings.slidesToShow}
        slidesToScroll={settings.slidesToScroll}
        autoplay={settings.autoplay}
        autoplaySpeed={settings.autoplaySpeed}
        adaptiveHeight={settings.adaptiveHeight}
      >
        {images.map((image, index) => (
          <div key={image}>
            <img src={image} alt={`Slide ${index + 1}`} className="gallery-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

SlidingGallery.propTypes = {
  // Add prop-types validation
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SlidingGallery;
