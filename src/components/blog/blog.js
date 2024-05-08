import React from 'react';
import './blog.scss';
import { Link } from 'react-router-dom';
import blogCard1Image1 from '../images/jpeg/blogCard1Image1.jpg';
import dateIcon from '../images/png/Calendar.png';
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
    <div id="blogText">
      <div>
        <h5>
          <span>Blog</span>
          Archives
        </h5>
        <h1>Explore Our Other Blogs</h1>
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
      <div id="blog_card">
        <img src={blogCard1Image1} alt="blog_card_image" />
        <div className="date_icon">
          <img src={dateIcon} alt="date_icon" />
          <p>January 10, 2024</p>
        </div>
        <Link to="/articleDetails">
          <h1>Pixeel Perfect, A Beautiful Adventure in Photogrphy</h1>
        </Link>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div id="blog_card">
        <img src={blogCard1Image1} alt="blog_card_image" />
        <div className="date_icon">
          <img src={dateIcon} alt="date_icon" />
          <p>January 10, 2024</p>
        </div>
        <Link to="/articleDetails">
          <h1>Pixeel Perfect, A Beautiful Adventure in Photogrphy</h1>
        </Link>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div id="blog_card">
        <img src={blogCard1Image1} alt="blog_card_image" />
        <div className="date_icon">
          <img src={dateIcon} alt="date_icon" />
          <p>January 10, 2024</p>
        </div>
        <Link to="/articleDetails">
          <h1>Pixeel Perfect, A Beautiful Adventure in Photogrphy</h1>
        </Link>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div id="blog_card">
        <img src={blogCard1Image1} alt="blog_card_image" />
        <div className="date_icon">
          <img src={dateIcon} alt="date_icon" />
          <p>January 10, 2024</p>
        </div>
        <Link to="/articleDetails">
          <h1>Pixeel Perfect, A Beautiful Adventure in Photogrphy</h1>
        </Link>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div id="blog_card">
        <img src={blogCard1Image1} alt="blog_card_image" />
        <div className="date_icon">
          <img src={dateIcon} alt="date_icon" />
          <p>January 10, 2024</p>
        </div>
        <Link to="/articleDetails">
          <h1>Pixeel Perfect, A Beautiful Adventure in Photogrphy</h1>
        </Link>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div id="blog_card">
        <img src={blogCard1Image1} alt="blog_card_image" />
        <div className="date_icon">
          <img src={dateIcon} alt="date_icon" />
          <p>January 10, 2024</p>
        </div>
        <Link to="/articleDetails">
          <h1>Pixeel Perfect, A Beautiful Adventure in Photogrphy</h1>
        </Link>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
    </div>
    <FooterBody />
  </div>
);

export default Blog;
