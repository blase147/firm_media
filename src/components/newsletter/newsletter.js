import React from 'react';
import './newsletter.scss';

const Newsletter = () => (
  <div id="newsletter">
    <div className="newsletter_text">
      <h2>Join Our Newsletter</h2>
      <p>
        Subscribe to our newsletter to receive early discounts offers, updates
        and info.
      </p>
    </div>
    <form>
      <input className="input" type="email" placeholder="Enter your email" />
      <button className="button" type="submit">
        Subscribe
      </button>
    </form>
  </div>
);

export default Newsletter;
