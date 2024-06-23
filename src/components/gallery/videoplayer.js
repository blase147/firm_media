import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const VideoPlayer = ({ videoId }) => (
  <div className="video-player">
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube Video"
    ></iframe>
  </div>
);
VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default VideoPlayer;
