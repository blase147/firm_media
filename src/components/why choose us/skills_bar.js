import React from 'react';
import PropTypes from 'prop-types';
import './skills_bar.scss';

const SkillBar = ({ skillName, percentage }) => (
  <div className="skill-bar">
    <div className="skill-name">{skillName}</div>
    <div className="bar-container">
      <div className="bar" style={{ width: `${percentage}%` }}>
        90
      </div>
    </div>
  </div>
);

SkillBar.propTypes = {
  skillName: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default SkillBar;
