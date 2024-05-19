import React from 'react';
import './aboutDetails.scss';
import About from './about';
import OurRecord from '../our record/our_record';
import aboutImage1 from '../images/jpeg/about_img1.jpg';
import SkillBar from '../why choose us/skills_bar';
import whyChooseUsCardIcon1 from '../images/png/Management.png';
import FooterBody from '../footer body/footer_body';
import MenuBanner from '../banners/menuBanner';
import aboutDetailsBanner from '../images/jpeg/homepage_banner.jpg';
import NewsLetter from '../newsletter/newsletter';

const AboutDetails = () => (
  <div id="aboutdetailsContainer">
    <MenuBanner
      backgroundImage={aboutDetailsBanner}
      heading="About"
      paragraph="FirmtecsMedia Production is a media production company
        that specializes in photography and videography. We are dedicated
        to capturing your special moments and making them last a lifetime.
        Our team of skilled photographers videographers will work with you
        to create stunning images and videos that you can cherish forever.
        Whether you're planning a wedding, a corporate event, or a family
        photoshoot, we have the expertise and equipment to bring your
        vision to life. Contact us today to learn more about our services
        and how we can help you capture your moments in style."
    />
    <About />
    <OurRecord />
    <div id="aboutUsCardContainer">
      <div className="aboutUsCard">
        <h3>Our Vision</h3>
        <hr />
        <p>
          OUr mission is to provide our clients with the highest quality
          photography and videography services. We strive to capture your
          special moments in a way that is both beautiful and authentic. Our
          team of skilled photographers and videographers will work with you to
          create stunning images and videos that you can cherish forever.
          Whether you&aposre planning a wedding, a corporate event, or a family
          photoshoot, we have the expertise and equipment to bring your vision
          to life. Contact us today to learn more about our services and how we
          can help you capture your moments in style.
        </p>
      </div>
      <div className="aboutUsCard">
        <h3>Our Mision</h3>
        <hr />
        <p>
          Our Mission is to provide our clients with the highest quality
          photography and videography services. We strive to capture your
          special moments in a way that is both beautiful and authentic. Our
          team of skilled photographers and videographers will work with you to
          create stunning images and videos that you can cherish forever.
          Whether you&aposre planning a wedding, a corporate event, or a family
          photoshoot, we have the expertise and equipment to bring your vision
          to life. Contact us today to learn more about our services and how we
          can help you capture your moments in style.
        </p>
      </div>
      <div className="aboutUsCard">
        <h3>Our Motto</h3>
        <hr />
        <p>
          Our Motto is to provide our clients with the highest quality
          photography and videography services. We strive to capture your
          special moments in a way that is both beautiful and authentic. Our
          team of skilled photographers and videographers will work with you to
          create stunning images and videos that you can cherish forever.
          Whether you&aposre planning a wedding, a corporate event, or a family
          photoshoot, we have the expertise and equipment to bring your vision
          to life. Contact us today to learn more about our services and how we
          can help you capture your moments in style.
        </p>
      </div>
    </div>
    <div id="ourSkillsContainer">
      <div id="ourSkillsText">
        <h5>
          <span>Our</span>
          Skills
        </h5>
        <h2>Our Skills capture What Our Words Can&apos;t</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <div className="skills">
          <SkillBar skillName="Photography" percentage="90" />
          <SkillBar skillName="Videography" percentage="80" />
          <SkillBar skillName="Drone Shoot" percentage="70" />
          <SkillBar skillName="Wedding Shoot" percentage="85" />
        </div>
      </div>
      <img src={aboutImage1} alt="aboutImage" />
    </div>
    <div id="whyChooseUsContainer">
      <div id="whyChooseUsTextContainer">
        <div id="whyChooseUsTextTitle">
          <h5>
            <span>Why Choose</span>
            Us
          </h5>
          <h2>In Every Click, Perfection</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
      </div>
      <div id="whyChooseUsCardContainer">
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Professional Team</h3>
          <p>
            We bring the right people together to challenge established thinking
            and drive transform in 2020
          </p>
        </div>
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Creativity and Innovation</h3>
          <p>
            We bring the right people together to challenge established thinking
            and drive transform in 2020
          </p>
        </div>
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Wide Range of Services</h3>
          <p>
            We bring the right people together to challenge established thinking
            and drive transform in 2020
          </p>
        </div>
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Affordable Price</h3>
          <p>
            We bring the right people together to challenge established thinking
            and drive transform in 2020
          </p>
        </div>
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Best Equipment</h3>
          <p>
            We bring the right people together to challenge established thinking
            and drive transform in 2020
          </p>
        </div>
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Fast Response</h3>
          <p>
            We bring the right people together to challenge established thinking
            and drive transform in 2020
          </p>
        </div>
      </div>
    </div>
    <NewsLetter />
    <FooterBody />
  </div>
);

export default AboutDetails;
