import React from 'react';
import './myPortfolio.scss';
import myPortfolioImage1 from '../images/jpeg/galleryImage1.jpg';
// import myPortfolioImage2 from '../images/jpeg/galleryImage2.jpg';
// import myPortfolioImage3 from '../images/jpeg/galleryImage3.jpg';
// import myPortfolioImage4 from '../images/jpeg/galleryImage4.jpg';
// import myPortfolioImage5 from '../images/jpeg/galleryImage5.jpg';
import portfolioBanner from '../images/jpeg/homepage_banner.jpg';
import MenuBanner from '../banners/menuBanner';
import HireUs from '../hire us/hire_us';
import Testinmonial from '../testimonials/testimonials';
import FooterBody from '../footer body/footer_body';

const MyPortfolio = () => (
  <div id="myPortfolio">
    <MenuBanner
      backgroundImage={portfolioBanner}
      heading="Portfolio"
      paragraph="FirmtecsMedia Production is a media production company
        that specializes in photography and videography. We are dedicated
        to capturing your special moments and making them last a lifetime.
        "
    />
    <div id="myPortfolio_text">
      <div>
        <h5>
          <span>Our</span>
          Gallery
        </h5>
        <h1>See What We Have Done</h1>
      </div>
      <div>
        <a href="https://www.youtube.com">
          <button className="button" type="button">
            See More
          </button>
        </a>
      </div>
    </div>
    <div id="myPortfolio_content">
      <div className="grid-container">
        <div className="grid-item item1">
          {/* 1 */}
          <img src={myPortfolioImage1} alt="myPortfolio" />
        </div>
        <div className="grid-item item2">
          {/* 2 */}
          <img src={myPortfolioImage1} alt="myPortfolio" />
        </div>
        <div className="grid-item item3">
          {/* 3 */}
          <img src={myPortfolioImage1} alt="myPortfolio" />
        </div>
        <div className="grid-item item4">
          {/* 4 */}
          <img src={myPortfolioImage1} alt="myPortfolio" />
        </div>
        <div className="grid-item item5">
          {/* 5 */}
          <img src={myPortfolioImage1} alt="myPortfolio" />
        </div>
        <div className="grid-item item6">
          {/* 6 */}
          <img src={myPortfolioImage1} alt="myPortfolio" />
        </div>
        <div className="grid-item item7">
          {/* 7 */}
          <img src={myPortfolioImage1} alt="myPortfolio" />
        </div>
        <div className="grid-item item8">
          {/* 8 */}
          <img src={myPortfolioImage1} alt="myPortfolio" />
        </div>
        <div className="grid-item item9">
          {/* 9 */}
          <img src={myPortfolioImage1} alt="myPortfolio" />
        </div>
      </div>
    </div>
    <HireUs />
    <Testinmonial />
    <FooterBody />
  </div>
);

export default MyPortfolio;
