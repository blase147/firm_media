import React from 'react';
import './articleDetails.scss';
import { faEnvelope, faPhone, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import articleBanner from '../images/jpeg/homepage_banner.jpg';
import MenuBanner from '../banners/menuBanner';
import FooterBody from '../footer body/footer_body';
import articleImage from '../images/jpeg/galleryImage1.jpg';
import SocialIcons from '../social icons/social_icons';
import homepageBanner from '../images/jpeg/footer_image.jpg';
import Newsletter from '../newsletter/newsletter';

const ArticleDetails = () => {
  const bannerStyle = {
    backgroundImage: `url(${homepageBanner})`, // Set the background image dynamically
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '35vh',
  };
  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div id="article_display">
      <MenuBanner
        backgroundImage={articleBanner}
        heading="Light and Shadow: Exploring the Art of Photography"
        paragraph="Chukwuma Mosanya | December 1, 2024 | 0 Comment"
      />

      <div id="article_container">
        <div id="article_content">
          <div id="article_text">
            <img src={articleImage} alt="recent post" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div id="shareThisPost">
              <h3>Share This Post</h3>
              <SocialIcons />
            </div>
            <h3>Leave a Reply</h3>
            <p>
              Your email address will not be published. Required fields are
              marked *
            </p>
            <div id="formContainer">
              <form>
                <div>
                  <textarea placeholder="Your comment here" />
                  <input type="text" placeholder="Name*" />
                  <input type="email" placeholder="Email*" />
                  <input type="text" placeholder="Website" />
                </div>
                <button className="button" type="submit">
                  Post Comment
                </button>
                <br />
                <input type="checkbox" />
                <span>
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </span>
              </form>
            </div>
          </div>
          <div id="sideBar">
            <div id="author">
              <img src={articleImage} alt="date icon" />
              <h3>Chukwuma Mosanya</h3>
              <p>
                Chukwuma Mosanya is a professional photographer and writer. He
                loves to travel and explore new places. He has been in the
                photography industry for over 10 years and has worked with some
                of the best photographers in the world. He is passionate about
                capturing the beauty of the world around him and sharing it with
                others. In his free time, he enjoys hiking, camping, and
                photographing the natural world.
              </p>
            </div>
            <div id="recentPost">
              <h2>Recent Posts</h2>
              <div className="recentPostCard">
                <img src={articleImage} alt="recent post pic" />
                <div className="recentPostText">
                  <h4>Light and Shadow: Exploring the Art of Photography</h4>
                  <div className="imageDate">
                    <p>
                      <FontAwesomeIcon icon={faCalendarDay} />
                      10 Jan, 2024
                    </p>
                  </div>
                </div>
              </div>
              <div className="recentPostCard">
                <img src={articleImage} alt="recent post pic" />
                <div className="recentPostText">
                  <h4>Light and Shadow: Exploring the Art of Photography</h4>
                  <div className="imageDate">
                    <p>
                      <FontAwesomeIcon icon={faCalendarDay} />
                      10 Jan, 2024
                    </p>
                  </div>
                </div>
              </div>
              <div className="recentPostCard">
                <img src={articleImage} alt="recent post pic" />
                <div className="recentPostText">
                  <h4>Light and Shadow: Exploring the Art of Photography</h4>
                  <div className="imageDate">
                    <p>
                      <FontAwesomeIcon icon={faCalendarDay} />
                      10 Jan, 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div id="questions" style={bannerStyle}>
              <div style={overlayStyle}>
                <h3>Have Any Questions?</h3>
                <p>
                  Whether you&apos;re planning a wedding, a corporate event, or a
                  family photoshoot, we have the expertise and equipment to bring
                  your vision to life. Contact us today to learn more about our
                  services and how we can help you capture your moments in style.
                </p>
                <div>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>Email: example@example.com</span>
                  <br />
                  <FontAwesomeIcon icon={faPhone} />
                  <span>Phone: +1234567890</span>
                </div>
              </div>
            </div>
            <div id="followUs">
              <h3>Follow Us On:</h3>
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
      <FooterBody />
    </div>
  );
};

export default ArticleDetails;
