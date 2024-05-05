import React from 'react';
import SlidingGallery from './slidingGallery';
import galleryImage1 from '../images/jpeg/galleryImage1.jpg';
import galleryImage2 from '../images/jpeg/galleryImage2.jpg';
import galleryImage3 from '../images/jpeg/blogCard1Image3.jpg';
import galleryImage4 from '../images/jpeg/galleryImage4.jpg';
import galleryImage5 from '../images/jpeg/galleryImage5.jpg';

const GalleryPage = () => {
  const images = [
    galleryImage1,
    galleryImage2,
    galleryImage3,
    galleryImage4,
    galleryImage5,
  ];

  return (
    <div id="gallerySliderContainer">
      <SlidingGallery images={images} />
    </div>
  );
};

export default GalleryPage;
