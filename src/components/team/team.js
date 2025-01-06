import React from 'react';
import './team.scss';

const Team = () => (
  <div className="team-container">
    <h1>Our Team</h1>
    <p>
      Meet the dedicated professionals behind FirmMedia. Our team is
      committed to delivering exceptional digital marketing solutions.
    </p>
    <div className="team-members">
      {/* Example Team Member */}
      <div className="team-member">
        <img src="https://via.placeholder.com/150" alt="Team Member" />
        <h3>John Doe</h3>
        <p>Lead Photographer</p>
      </div>
      <div className="team-member">
        <img src="https://via.placeholder.com/150" alt="Team Member" />
        <h3>Jane Smith</h3>
        <p>Creative Director</p>
      </div>
    </div>
  </div>
);

export default Team;
