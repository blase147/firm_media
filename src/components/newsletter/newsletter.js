import React from 'react';
import './newsletter.scss';

const Newsletter = () => (
  <div>
    <div className="newsletter">
      <div className="newsletter_text">
        <h5>
          <span>Newsletter</span>
          Subscribe
        </h5>
        <h1>Get Our Latest News</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  </div>
);

export default Newsletter;
