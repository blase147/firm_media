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
      name: 'Emeka Innoson',
      role: 'Busness Man',
      image: testimonialImage2,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500, // Adjust the speed for smoother sliding
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Optionally hide arrows on small screens
        },
      },
    ],
  };

  return (
    <div id="testimonials">
      <div className="h5_h2_p">
        <h5>
          <span>Their</span>
          Testimonial
        </h5>
        <h2>What Our Clients Have To Say</h2>
        <p>
          Firm Media garners consistent acclaim from clients who appreciate our
          unwavering commitment to delivering exceptional quality and professionalism
          in every project.
        </p>
      </div>
      <div id="testimonial_card_container">
        <Slider
          dots={settings.dots}
          infinite={settings.infinite}
          speed={settings.speed}
          slidesToShow={settings.slidesToShow}
          slidesToScroll={settings.slidesToScroll}
          autoplay={settings.autoplay}
          autoplaySpeed={settings.autoplaySpeed}
          adaptiveHeight={settings.adaptiveHeight}
          responsive={settings.responsive}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial_card">
              <StarRating totalStars={testimonial.stars} id="rating" />
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
