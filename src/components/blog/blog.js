import React from 'react';
import './blog.scss';
import blogImage1 from '../images/jpeg/galleryImage1.jpg';
import blogImage2 from '../images/jpeg/galleryImage2.jpg';
import blogImage3 from '../images/jpeg/galleryImage3.jpg';
import blogImage4 from '../images/jpeg/galleryImage4.jpg';
import blogImage5 from '../images/jpeg/galleryImage5.jpg';

const Blog = () => (
  <div id="blog">
    <div id="blog_text">
      <div>
        <h5>
          <span>Our</span>
          Blog
        </h5>
        <h1>Read Our Blog</h1>
      </div>
      <button className="button" type="button">
        Discover More
      </button>
    </div>
    <div id="blog_content">
      <div id="blog_content1">
        <img src={blogImage1} alt="blog" />
        <img src={blogImage2} alt="blog" />
      </div>
      <div id="blog_content2">
        <img src={blogImage3} alt="blog" />
      </div>
      <div id="blog_content3">
        <img src={blogImage4} alt="blog" />
        <img src={blogImage5} alt="blog" />
      </div>
    </div>
  </div>
);

export default Blog;
