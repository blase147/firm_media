import React from 'react';
import './gallery.scss';
import { Link } from 'react-router-dom';
import galleryImage1 from '../images/jpeg/galleryImage1.jpg';
import galleryImage2 from '../images/jpeg/galleryImage2.jpg';
import galleryImage3 from '../images/jpeg/galleryImage3.jpg';
import galleryImage4 from '../images/jpeg/galleryImage4.jpg';
import galleryImage5 from '../images/jpeg/galleryImage5.jpg';

const Gallery = () => (
  <div id="gallery">
    <div id="gallery_text">
      <div className="gallery_text">
        <h5>
          <span>Our</span>
          Gallery
        </h5>
        <h2>See What We Have Done</h2>
      </div>
      <Link to="/myPortfolio">
        <button className="button" type="button">
          See More
        </button>
      </Link>
    </div>
    <div id="gallery_container">
      <div id="gallery_content">
        <img src={galleryImage1} alt="gallery" />
      </div>
      <div id="gallery_content">
        <img src={galleryImage2} alt="gallery" />
      </div>
      <div id="gallery_content">
        <img src={galleryImage3} alt="gallery" />
      </div>
      <div id="gallery_content">
        <img src={galleryImage4} alt="gallery" />
      </div>
      <div id="gallery_content">
        <img src={galleryImage5} alt="gallery" />
      </div>
    </div>
  </div>
);

export default Gallery;
