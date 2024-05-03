import React from 'react';
import './partners.scss';
import PartnerImag1 from '../images/png/partner1.png';
import PartnerImag2 from '../images/png/partner2.png';
import PartnerImag3 from '../images/png/partner3.png';
import PartnerImag4 from '../images/png/partner4.png';
import PartnerImag5 from '../images/png/partner5.png';

const Partners = () => (
  <div id="partners_container">
    <div id="partners">
      <img src={PartnerImag1} alt="partner" />
    </div>
    <div id="partners">
      <img src={PartnerImag2} alt="partner" />
    </div>
    <div id="partners">
      <img src={PartnerImag3} alt="partner" />
    </div>
    <div id="partners">
      <img src={PartnerImag4} alt="partner" />
    </div>
    <div id="partners">
      <img src={PartnerImag5} alt="partner" />
    </div>
  </div>
);

export default Partners;
