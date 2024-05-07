import React from 'react';
import './blog.scss';
import blogImage1 from '../images/jpeg/galleryImage1.jpg';
import blogImage2 from '../images/jpeg/galleryImage2.jpg';
import blogImage3 from '../images/jpeg/galleryImage3.jpg';
import blogImage4 from '../images/jpeg/galleryImage4.jpg';
import blogImage5 from '../images/jpeg/galleryImage5.jpg';
import BlogUpdate from '../blogUpdate/blog_update';
import MenuBanner from '../banners/menuBanner';
import blogBanner from '../images/jpeg/homepage_banner.jpg';
import FooterBody from '../footer body/footer_body';

const Blog = () => (
  <div id="blog">
    <MenuBanner
      backgroundImage={blogBanner}
      heading="Blog"
      paragraph="FirmtecsMedia Production is a media production company
        that specializes in photography and videography. We are dedicated
        to capturing your special moments and making them last a lifetime.
        Our team of skilled photographers videographers will work with you
        to create stunning images and videos that you can cherish forever.
        Whether you're planning a wedding, a corporate event, or a family
        photoshoot, we have the expertise and equipment to bring your
        vision to life. Contact us today to learn more about our services
        and how we can help you capture your moments in style."
    />
    <BlogUpdate />
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
    <FooterBody />
  </div>
);

export default Blog;
