import React from 'react';
import './footer_body.scss';

const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <p>
        &copy;
        {currentYear}
        {' '}
        FirmMedia. All rights reserved.
      </p>
    </div>
  );
};

export default Copyright;
