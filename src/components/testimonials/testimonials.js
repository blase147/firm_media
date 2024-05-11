import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarRating from './starRating';
import testimonialImage1 from '../images/jpeg/testimonialImage1.jpg';
import testimonialImage2 from '../images/jpeg/testimonialImage2.jpg';
import './testimonials.scss';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1, // Add a unique identifier for each testimonial
      stars: 4,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
      name: 'Chukwuma Mosanya',
      role: 'Software Engineer',
      image: testimonialImage1,
    },
    {
      id: 2, // Add a unique identifier for each testimonial
      stars: 3,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
      name: 'Chukwuma Mosanya',
      role: 'Software Engineer',
      image: testimonialImage2,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500, // Adjust the speed for smoother sliding
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
  };

  return (
    <div id="testimonials">
      <div id="testimonials_text">
        <h5>
          <span>Their</span>
          Testimonial
        </h5>
        <h1>What Our Clients Have To Say</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea
        </p>
      </div>
      <div id="testimonial_card_container">
        <Slider
          className="slider"
          dots={settings.dots}
          infinite={settings.infinite}
          speed={settings.speed}
          slidesToShow={settings.slidesToShow}
          slidesToScroll={settings.slidesToScroll}
          autoplay={settings.autoplay}
          autoplaySpeed={settings.autoplaySpeed}
          adaptiveHeight={settings.adaptiveHeight}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial_card">
              <StarRating totalStars={testimonial.stars} />
              <p>{testimonial.text}</p>
              <div className="testimonial_image_byline">
                <img src={testimonial.image} alt="Testimonial" />
                <div className="testimonial_byline">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
