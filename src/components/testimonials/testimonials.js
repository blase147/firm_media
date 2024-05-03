import React from 'react';
import './testimonials.scss';
import testimonialImage1 from '../images/jpeg/testimonialImage1.jpg';
import testimonialImage2 from '../images/jpeg/testimonialImage2.jpg';
import StarRating from './starRating';

const Testimonials = () => (
  <div id="testimonials">
    <div id="testimonials_text">
      <h5>
        <span>Their</span>
        Testimonial
      </h5>
      <h1>What Our Clients Have To Say</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla
      </p>
    </div>
    <div id="testimonial_card_container">
      <div className="testimonial_card">
        <StarRating totalStars={4} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        </p>
        <div className="testimonial_image_byline">
          <img src={testimonialImage1} alt="Testimonial" />
          <div className="testimonial_byline">
            <h4>Chukwuma Mosanya</h4>
            <p>Software Engineer</p>
          </div>
        </div>
      </div>
      <div className="testimonial_card">
        <StarRating totalStars={3} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        </p>
        <div className="testimonial_image_byline">
          <img src={testimonialImage2} alt="Testimonial" />
          <div className="testimonial_byline">
            <h4>Chukwuma Mosanya</h4>
            <p>Software Engineer</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Testimonials;
