import React from 'react';
import './blog_update.scss';
// import { Link } from 'react-router-dom';
// import blogCard1Image2 from '../images/jpeg/blogCard1Image2.jpg';
// import dateIcon from '../images/png/Calendar.png';
// import MediumPosts from '../blog/medium_posts';
import MediumPosts1 from '../blog/medium_posts_1';
import MediumPosts2 from '../blog/medium_posts_2';

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
        <a href="https://medium.com/@solarmails2" target="_blank" rel="noreferrer">
          <button className="button" type="button">See More</button>
        </a>
      </div>
      <div id="blog_content">
        <div id="blog_card1">
          <MediumPosts1 />
        </div>
        <div id="blog_card2">
          <MediumPosts2 />
        </div>
      </div>
    </div>
  </div>
);

export default BlogUpdate;
