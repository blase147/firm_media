import React from 'react';
import './blog.scss';
import BlogUpdate from '../blogUpdate/blog_update';
import MenuBanner from '../banners/menuBanner';
import blogBanner from '../images/jpeg/homepage_banner.jpg';
import FooterBody from '../footer body/footer_body';
import NewsLetter from '../newsletter/newsletter';
import MediumPosts from './medium_posts';

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
    <div id="blogText">
      <div>
        <h5>
          <span>Blog</span>
          Archives
        </h5>
        <h3>Explore Our Other Blogs</h3>
      </div>
      <div>
        <p>
          Whether you&apos;re planning a wedding, a corporate event, or a family
          photoshoot, we have the expertise and equipment to bring your vision
          to life. Contact us today to learn more about our services and how we
          can help you capture your moments in style.
        </p>
      </div>
    </div>
    <div id="blogContent">
      <MediumPosts />
    </div>
    <NewsLetter />
    <FooterBody />
  </div>
);

export default Blog;
