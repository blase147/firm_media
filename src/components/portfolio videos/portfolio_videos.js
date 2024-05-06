import React from 'react';
import './portfolio_videos.scss';

const PortfolioVideos = () => (
  <div id="port_vid">
    <div id="port_vid_text">
      <h1>Adventure Awaits, Enjoy Our Captivating Photography</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla
      </p>
      <button className="button" type="button">Discover More</button>
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
