import React from 'react';
import './why_choose_us.scss';
import SkillBar from './skills_bar';
import Professional from '../images/png/Management.png';
import AffordablePrice from '../images/png/Hot Price Tag.png';
import Creativity from '../images/png/Creativity.png';
import Services from '../images/png/Service.png';

const WhyChooseUs = () => (
  <div>
    <div id="why_choose_us">
      <div id="why_choose_us_text" className="h5_h2_p">
        <h5>
          <span>Why</span>
          Choose Us
        </h5>
        <h2>Cherish Moments, Choose Us</h2>
        <p>
          Firm Media stands out for its commitment to excellence and creativity
          in every project. With a dedicated team of professionals, cutting-edge
          equipment, and a passion for delivering exceptional results, we ensure
          your vision is brought to life with precision and artistry. Whether you&apos;re
          seeking stunning visuals, reliable service, or innovative solutions, trust
          Firm Media to exceed your expectations every time.
        </p>
        <div className="skills">
          <SkillBar skillName="Photography" percentage="90" />
          <SkillBar skillName="Videography" percentage="80" />
          <SkillBar skillName="Drone Shoot" percentage="70" />
          <SkillBar skillName="Wedding Shoot" percentage="85" />
        </div>
      </div>
      <div id="why_choose_us_card_container">
        <div id="why_choose_us_card">
          <img src={Professional} alt="PROFESSIONAL ICON" />
          <h3>Professional Team</h3>
          <p>
            Our team at Firm Media is a collective of passionate creatives dedicated
            to bringing your vision to life. With expertise in photography, videography,
            drone operations, studio shoots, and post-production, each member contributes
            unique skills and a commitment to excellence. We are driven by creativity,
            precision, and a shared goal to exceed expectations with every project.
          </p>
        </div>
        <div id="why_choose_us_card">
          <img src={AffordablePrice} alt="affordable icon" />
          <h3>Affordable Price</h3>
          <p>
            At Firm Media, we believe in quality without compromise. Our competitive
            pricing ensures that you get exceptional value for photography, videography,
            drone shoots, studio sessions, equipment leasing, and post-production services.
            Explore our affordable options tailored to meet your needs without sacrificing
            excellence.
          </p>
        </div>
        <div id="why_choose_us_card">
          <img src={Creativity} alt="creativity icon" />
          <h3>Creativity and Innovation</h3>
          <p>
            At Firm Media, creativity and innovation drive everything we do. We blend artistic
            vision with cutting-edge technology to deliver captivating visuals that exceed
            expectations. Our team thrives on pushing boundaries, ensuring each project is
            infused with fresh ideas and inventive solutions. Whether it&apos;s through photography,
            videography, or post-production, we&apos;re dedicated to elevating your vision to new
            heights with our creative expertise.
          </p>
        </div>
        <div id="why_choose_us_card">
          <img src={Services} alt="services icon" />
          <h3>Wide Range of Services</h3>
          <p>
            Firm Media offers a diverse array of services tailored to meet your visual conten
            t needs. Whether you&apos;re looking for stunning photography, dynamic videography,
            precise drone footage, professional studio sessions, reliable equipment leasing,
            or meticulous post-production editing, we have you covered. Our comprehensive
            suite of services ensures every project is executed with creativity, precision,
            and a commitment to excellence. Partner with Firm Media for your next visual
            storytelling endeavor and experience the difference firsthand.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default WhyChooseUs;
