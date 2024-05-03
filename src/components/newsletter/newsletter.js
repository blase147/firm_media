import React from 'react';
import './newsletter.scss';

const Newsletter = () => (
  <div>
    <div id="newsletter">
      <div className="newsletter_text">
        <h1>Join Our Newsletter</h1>
        <p>
          Subscribe to our newsletter to receive early discounts offers, updates and info.
        </p>
      </div>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </div>
);

export default Newsletter;
