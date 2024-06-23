import React from 'react';
import PropTypes from 'prop-types';

const InstagramPost = ({ post }) => {
  let mediaContent = null;

  if (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
    mediaContent = <img src={post.media_url} alt={post.caption} />;
  } else if (post.media_type === 'VIDEO') {
    mediaContent = (
      <video controls>
        <source src={post.media_url} type="video/mp4" />
        <track kind="captions" srcLang="en" label="English captions" default />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <div className="instagram-post">
      {mediaContent}
      {post.caption && <p>{post.caption}</p>}
    </div>
  );
};

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
