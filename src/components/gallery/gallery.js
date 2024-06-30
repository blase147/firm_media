import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './gallery.scss';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import axios from 'axios';

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const accessToken = process.env.REACT_APP_INSTAGRAM_API_KEY;

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await axios.get('https://graph.instagram.com/me/media', {
          params: {
            fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
            access_token: accessToken,
          },
        });
        console.log('Fetched data:', response.data); // Log fetched data for inspection
        if (response.data && response.data.data) {
          // Limit to the first 9 posts
          setPosts(response.data.data.slice(0, 9));
        } else {
          console.error('Invalid data structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      }
    };

    if (accessToken) {
      fetchInstagramPosts();
    } else {
      console.error('Instagram API key not found.');
    }
  }, [accessToken]);

  const fetchCarouselChildren = async (id) => {
    try {
      const response = await axios.get(`https://graph.instagram.com/${id}/children`, {
        params: {
          fields: 'id,media_type,media_url,thumbnail_url',
          access_token: accessToken,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching carousel items:', error);
      return [];
    }
  };

  const renderMedia = (post) => {
    console.log('Rendering post:', post); // Log the post being rendered

    if (post.media_type === 'IMAGE' && post.media_url) {
      return (
        <img
          src={post.media_url}
          alt={post.caption || 'Instagram Post'}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; console.error(`Error loading image with URL: ${post.media_url}`); }}
        />
      );
    } if (post.media_type === 'VIDEO' && post.media_url) {
      return (
        <video controls style={{ maxWidth: '100%', height: 'auto' }}>
          <source src={post.media_url} type="video/mp4" />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      );
    } if (post.media_type === 'CAROUSEL_ALBUM') {
      return <Carousel postId={post.id} />;
    }
    return (
      <img
        src="https://via.placeholder.com/150"
        alt="Placeholder"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    );
  };

  const Carousel = ({ postId }) => {
    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
      const fetchCarousel = async () => {
        try {
          const items = await fetchCarouselChildren(postId);
          setCarouselItems(items);
        } catch (error) {
          console.error('Error fetching carousel items:', error);
        }
      };

      fetchCarousel();
    }, [postId]);

    return (
      <ResponsiveCarousel>
        {carouselItems.map((item) => (
          <div key={item.id} className="carousel-item">
            {item.media_type === 'IMAGE' && <img src={item.media_url} alt="Carousel Item" />}
            {item.media_type === 'VIDEO' && (
              <video controls>
                <source src={item.media_url} type="video/mp4" />
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </ResponsiveCarousel>
    );
  };

  Carousel.propTypes = {
    postId: PropTypes.string.isRequired,
  };

  return (
    <div id="gallery">
      <div>
        <div>
          <h5>
            <span>Our</span>
            Gallery
          </h5>
          <h2>See What We Have Done</h2>
        </div>
        <Link to="/myPortfolio">
          <button className="button" type="button">
            See More...
          </button>
        </Link>
      </div>
      <div id="gallery_container">
        <div id="gallery_content">
          <div className="instagram-feed">
            {posts.length === 0 && <p>No posts to display</p>}
            {' '}
            {/* Show message if no posts */}
            {posts.map((post) => (
              <div
                key={post.id}
                className="instagram-post"
              >
                {renderMedia(post)}
                {(!post.media_url && !post.thumbnail_url) && <p>Media URL is missing</p>}
                <p>{post.caption}</p>
                <a href={post.permalink} target="_blank" rel="noopener noreferrer">View on Instagram</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
