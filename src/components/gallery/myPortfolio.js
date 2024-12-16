import React, { useState, useEffect } from 'react';
import './myPortfolio.scss';
import { fetchYouTubeVideos } from './youtube_api';
import VideoPlayer from './videoplayer';
import portfolioBanner from '../images/jpeg/portfolio_banner.jpg';
import MenuBanner from '../banners/menuBanner';
import HireUs from '../hire us/hire_us';
import Testinmonial from '../testimonials/testimonials';
import FooterBody from '../footer body/footer_body';
import Newsletter from '../newsletter/newsletter';

const MyPortfolio = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoData = await fetchYouTubeVideos();
      setVideos(videoData);
    };

    fetchVideos();
  }, []);

  return (
    <div id="myPortfolio">
      <MenuBanner
        backgroundImage={portfolioBanner}
        heading="Portfolio"
        paragraph="FirmtecsMedia Production is a media production company
          that specializes in photography and videography. We are dedicated
          to capturing your special moments and making them last a lifetime."
        showButton={false}
      />
      <div id="myPortfolio_text">
        <div>
          <h5>
            <span>Our</span>
            Gallery
          </h5>
          <h1>See What We Have Done</h1>
        </div>
        <div>
          <a href="https://studio.youtube.com/channel/UCwr0jDqS6WW03baKcf5qJhg">
            <button className="button" type="button">
              See More
            </button>
          </a>
        </div>
      </div>
      <div id="myPortfolio_content">
        <div className="grid-container">
          {videos.map((video) => (
            <VideoPlayer key={video.id.videoId} videoId={video.id.videoId} />
          ))}
        </div>
      </div>
      <HireUs />
      <Testinmonial />
      <Newsletter />
      <FooterBody />
    </div>
  );
};

export default MyPortfolio;
