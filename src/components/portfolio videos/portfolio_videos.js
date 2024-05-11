import React from 'react';
import './portfolio_videos.scss';
import { Link } from 'react-router-dom';

const PortfolioVideos = () => (
  <div id="port_vid">
    <div id="port_vid_text">
      <h2>Adventure Awaits, Enjoy Our Captivating Photography</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      </p>
      <Link to="/portfolio">
        <button className="button" type="button">
          Discover More
        </button>
      </Link>

    </div>
    <iframe
      width="100%"
      height="520"
      src="https://www.youtube.com/embed/cl7QisS8XH0"
      title="How to Film Yourself and Look Cinematic"
      // frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      // referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  </div>
);

export default PortfolioVideos;
