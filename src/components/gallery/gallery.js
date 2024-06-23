import React, { useState, useEffect } from 'react';
import './gallery.scss';
import { Link } from 'react-router-dom';
import { fetchInstagramPosts } from './insta_api';
import InstagramPost from './instagramPost';

const Gallery = () => {
  const [instagramPosts, setInstagramPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await fetchInstagramPosts();
      setInstagramPosts(postData);
    };
    fetchPosts();
  }, []);

  return (
    <div id="gallery">
      <div>
        <div className="h5_h2_p">
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
          <div className="instagram-posts">
            {instagramPosts.map((post) => (
              <InstagramPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
