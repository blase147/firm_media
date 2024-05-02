import React from 'react';
import './why_choose_us.scss';
import SkillBar from './skills_bar';

const WhyChooseUs = () => (
  <div>
    <div id="why_choose_us">
      <div id="why_choose_us_text">
        <h5>
          <span>Why</span>
          Choose Us
        </h5>
        <h1>Cherish Moments, Choose Us</h1>
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
    </div>
  </div>
);

export default WhyChooseUs;
