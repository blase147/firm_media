import React from 'react';
import PropTypes from 'prop-types';

const InstagramPost = ({ post }) => (
  <div className="instagram-post">
    {post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' ? (
      <img src={post.media_url} alt={post.caption} />
    ) : post.media_type === 'VIDEO' ? (
      <video controls>
        <source src={post.media_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : null}
    {post.caption && <p>{post.caption}</p>}
  </div>
);

InstagramPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string,
    media_type: PropTypes.string.isRequired,
    media_url: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
    thumbnail_url: PropTypes.string,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
};

export default InstagramPost;
