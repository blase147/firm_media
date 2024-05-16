import React from 'react';
import './why_choose_us.scss';
import SkillBar from './skills_bar';
import managementIcon from '../images/png/Management.png';

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
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
          <img src={managementIcon} alt="management" />
          <h3>Quality</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </p>
        </div>
        <div id="why_choose_us_card">
          <img src={managementIcon} alt="management" />
          <h3>Quality</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </p>
        </div>
        <div id="why_choose_us_card">
          <img src={managementIcon} alt="management" />
          <h3>Quality</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </p>
        </div>
        <div id="why_choose_us_card">
          <img src={managementIcon} alt="management" />
          <h3>Quality</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default WhyChooseUs;
