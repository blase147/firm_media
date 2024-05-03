import React from 'react';
import './gallery.scss';
import galleryImage1 from '../images/jpeg/galleryImage1.jpg';
import galleryImage2 from '../images/jpeg/galleryImage2.jpg';
import galleryImage3 from '../images/jpeg/galleryImage3.jpg';
import galleryImage4 from '../images/jpeg/galleryImage4.jpg';
import galleryImage5 from '../images/jpeg/galleryImage5.jpg';

const Gallery = () => (
  <div id="gallery">
    <div id="gallery_text">
      <div>
        <h5>
          <span>Our</span>
          Gallery
        </h5>
        <h1>See What We Have Done</h1>
      </div>
      <button type="button">Discover More</button>
    </div>
    <div id="gallery_content">
      <div id="gallery_content1">
        <img src={galleryImage1} alt="gallery" />
        <img src={galleryImage2} alt="gallery" />
      </div>
      <div id="gallery_content2">
        <img src={galleryImage3} alt="gallery" />
      </div>
      <div id="gallery_content3">
        <img src={galleryImage4} alt="gallery" />
        <img src={galleryImage5} alt="gallery" />
      </div>
    </div>
  </div>
);

export default Gallery;
