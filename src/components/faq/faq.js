import React from 'react';
import './faq.scss';

const Faq = () => (
  <div className="faq-container">
    <h1>Frequently Asked Questions</h1>
    <div className="faq-item">
      <h3>What services do you offer?</h3>
      <p>
        We offer photography, videography, drone shots, studio shoots,
        equipment rental, and post-production services.
      </p>
    </div>
    <div className="faq-item">
      <h3>How can I book your services?</h3>
      <p>
        You can book our services directly through our website or contact us via phone or email.
      </p>
    </div>
  </div>
);

export default Faq;
