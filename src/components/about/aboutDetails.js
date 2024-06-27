import React from 'react';
import './aboutDetails.scss';
import About from './about';
import OurRecord from '../our record/our_record';
import aboutImage1 from '../images/jpeg/our_skill.jpg';
import SkillBar from '../why choose us/skills_bar';
import whyChooseUsCardIcon1 from '../images/png/Management.png';
import FooterBody from '../footer body/footer_body';
import MenuBanner from '../banners/menuBanner';
import aboutDetailsBanner from '../images/jpeg/about_banner.webp';
import NewsLetter from '../newsletter/newsletter';

const AboutDetails = () => (
  <div id="aboutdetailsContainer">
    <MenuBanner
      backgroundImage={aboutDetailsBanner}
      heading="About"
      paragraph="Discover Firm Media: Your dedicated partner in visual storytelling.
       With a passion for creativity and precision, we specialize in photography,
        videography, drone shoots, studio sessions, equipment leasing, and expert
         post-production. Let us bring your vision to life with professional
          excellence and unmatched quality."
      showButton={false} // Do not show button on this page
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
          Firm Media is distinguished by our deep expertise in crafting
          compelling visual narratives. With a seasoned team proficient in
          photography, videography, drone operations, and studio shoots, we
          excel in transforming concepts into captivating visual content. Our
          skillful approach extends to equipment leasing and meticulous
          post-production, ensuring every project meets the highest standards of
          excellence. Trust us to elevate your vision with precision and
          creativity.
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
            Our team at Firm Media is a collective of passionate creatives
            dedicated to bringing your vision to life. With expertise in
            photography, videography, drone operations, studio shoots, and
            post-production, each member contributes unique skills and a
            commitment to excellence. We are driven by creativity, precision,
            and a shared goal to exceed expectations with every project.
          </p>
        </div>
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Creativity and Innovation</h3>
          <p>
            At Firm Media, creativity and innovation drive everything we do. We
            blend artistic vision with cutting-edge technology to deliver
            captivating visuals that exceed expectations. Our team thrives on
            pushing boundaries, ensuring each project is infused with fresh
            ideas and inventive solutions. Whether it&apos;s through
            photography, videography, or post-production, we&apos;re dedicated
            to elevating your vision to new heights with our creative expertise.
          </p>
        </div>
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Wide Range of Services</h3>
          <p>
            Firm Media offers a diverse array of services tailored to meet your
            visual content needs. Whether you&apos;re looking for stunning
            photography, dynamic videography, precise drone footage,
            professional studio sessions, reliable equipment leasing, or
            meticulous post-production editing, we have you covered. Our
            comprehensive suite of services ensures every project is executed
            with creativity, precision, and a commitment to excellence. Partner
            with Firm Media for your next visual storytelling endeavor and
            experience the difference firsthand
          </p>
        </div>
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Affordable Price</h3>
          <p>
            At Firm Media, we believe in quality without compromise. Our
            competitive pricing ensures that you get exceptional value
            for photography, videography, drone shoots, studio sessions,
            equipment leasing, and post-production services. Explore our
            affordable options tailored to meet your needs without sacrificing excellence
          </p>
        </div>
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Best Equipment</h3>
          <p>
            At Firm Media, we pride ourselves on using cutting-edge equipment to
            ensure the highest quality in every project. From state-of-the-art
            cameras and drones to professional-grade studio gear, our equipment
            is meticulously maintained and operated by experienced professionals.
            Trust us to deliver stunning visuals that exceed expectations,
            powered by the best tools in the industry.
          </p>
        </div>
        <div className="whyChooseUsCard">
          <img src={whyChooseUsCardIcon1} alt="whyChooseUsCardIcon" />
          <h3>Fast Response</h3>
          <p>
            At Firm Media, we pride ourselves on our commitment to swift and
            efficient service. Our team is dedicated to responding promptly
            to your inquiries, ensuring seamless communication and quick
            turnaround times for all your project needs. Count on us to be
            there when you need us most, delivering reliable and rapid
            support every step of the way.
          </p>
        </div>
      </div>
    </div>
    <NewsLetter />
    <FooterBody />
  </div>
);

export default AboutDetails;
