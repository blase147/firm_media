import React from 'react';
import './myPortfolio.scss';
import myPortfolioImage1 from '../images/jpeg/galleryImage1.jpg';
import myPortfolioImage2 from '../images/jpeg/galleryImage2.jpg';
import myPortfolioImage3 from '../images/jpeg/galleryImage3.jpg';

const MyPortfolio = () => (
  <div id="myPortfolio">
    <div id="myPortfolio_text">
      <div>
        <h5>
          <span>My</span>
          Portfolio
        </h5>
        <h1>See What I Have Done</h1>
      </div>
      <button className="button" type="button">
        Discover More
      </button>
    </div>
    <div id="myPortfolio_content">
      <div id="myPortfolio_content1">
        <img src={myPortfolioImage1} alt="myPortfolio" />
        <img src={myPortfolioImage2} alt="myPortfolio" />
      </div>
      <div id="myPortfolio_content2">
        <img src={myPortfolioImage3} alt="myPortfolio" />
      </div>
      <div id="myPortfolio_content3">
        <img src={myPortfolioImage2} alt="myPortfolio" />
        <img src={myPortfolioImage3} alt="myPortfolio" />
      </div>
    </div>
  </div>
);

export default MyPortfolio;
