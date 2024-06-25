import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './gallery.scss';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Requires a loader
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const accessToken = process.env.REACT_APP_INSTAGRAM_API_KEY;

  useEffect(() => {
    fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Log fetched data for inspection
        if (data && data.data) {
          setPosts(data.data);
        } else {
          console.error('Invalid data structure:', data);
        }
      })
      .catch((error) => console.error('Error fetching Instagram posts:', error));
  }, [accessToken]);

  const fetchCarouselChildren = async (id) => {
    const response = await fetch(`https://graph.instagram.com/${id}/children?fields=id,media_type,media_url,thumbnail_url&access_token=${accessToken}`);
    const data = await response.json();
    return data.data;
  };

  const renderMedia = (post) => {
    console.log('Rendering post:', post); // Log the post being rendered

    if (post.media_type === 'IMAGE' && post.media_url) {
      return (
        <img
          src={post.media_url}
          alt={post.caption || 'Instagram Post'}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; console.error(`Error loading image with URL: ${post.media_url}`); }}
          style={{ maxWidth: '100%', height: 'auto' }}
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
      fetchCarouselChildren(postId)
        .then((items) => setCarouselItems(items))
        .catch((error) => console.error('Error fetching carousel items:', error));
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
    <div id="gallery" style={{ padding: '20px', textAlign: 'center' }}>
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
            See More...
          </button>
        </Link>
      </div>
      <div id="gallery_container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div id="gallery_content" style={{ width: '100%' }}>
          <div
            className="instagram-feed"
            style={{
              display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',
            }}
          >
            {posts.length === 0 && <p>No posts to display</p>}
            {' '}
            {/* Show message if no posts */}
            {posts.map((post) => (
              <div
                key={post.id}
                className="instagram-post"
                style={{
                  border: '1px solid #ddd', padding: '10px', width: 'calc(33% - 40px)', boxSizing: 'border-box',
                }}
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
