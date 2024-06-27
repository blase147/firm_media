import React from 'react';
import './blog.scss';
import BlogUpdate from '../blogUpdate/blog_update';
import MenuBanner from '../banners/menuBanner';
import blogBanner from '../images/jpeg/blog_banner.avif';
import FooterBody from '../footer body/footer_body';
import NewsLetter from '../newsletter/newsletter';
import MediumPosts from './medium_posts';

const Blog = () => (
  <div id="blog">
    <MenuBanner
      backgroundImage={blogBanner}
      heading="Blog"
      paragraph="Welcome to Firm Media's blog, where we dive deep into
       the world of visual storytelling, photography tips, videography
        techniques, and industry trends. Stay informed, inspired, and
         discover new perspectives in the realm of visual arts and media.
          Join us on a journey of creativity and knowledge sharing."
      showButton={false} // Do not show button on this page
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
