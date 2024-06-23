import React from 'react';
import PropTypes from 'prop-types';
import './myPortfolio.scss';

const VideoPlayer = ({ videoId }) => (
  <div className="video-player">
    <iframe
      width="457"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube Video"
    />
  </div>
);
VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default VideoPlayer;
