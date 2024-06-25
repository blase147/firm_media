import React from 'react';
import './blog_update.scss';
// import { Link } from 'react-router-dom';
import blogCard1Image2 from '../images/jpeg/blogCard1Image2.jpg';
import dateIcon from '../images/png/Calendar.png';
import MediumPosts from '../blog/medium_posts';

const BlogUpdate = () => (
  <div>
    <div id="blog_update">
      <div id="blog_text">
        <div className="h5_h2_p">
          <h5>
            <span>Blog</span>
            Update
          </h5>
          <h2>Latest Blog and News</h2>
        </div>
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
          <button className="button" type="button">See More</button>
        </a>
      </div>
      <div id="blog_content">
        <div id="blog_card1">
          <MediumPosts />
        </div>
        <div id="blog_card2">
          <div className="blog_card2_item">
            <img src={blogCard1Image2} alt="blog_card1_image" />
            <div className="blog_update_text">
              <div className="date_icon">
                <img src={dateIcon} alt="date_icon" />
                <span>January 10, 2024</span>
              </div>
              <h3>Pixeel Perfect, A Beautiful Adventure in Photogrphy</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
            </div>
          </div>
          <div className="blog_card2_item">
            <img src={blogCard1Image2} alt="blog_card1_image" />
            <div className="blog_update_text">
              <div className="date_icon">
                <img src={dateIcon} alt="date_icon" />
                <span>January 10, 2024</span>
              </div>
              <h3>Pixeel Perfect, A Beautiful Adventure in Photogrphy</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BlogUpdate;
