import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ totalStars }) => {
  // Generate unique keys for stars
  const generateKey = () => Math.random().toString(36);

  return (
    <div id="starRating">
      {[...Array(totalStars)].map(() => (
        <FaStar
          key={generateKey()} // Generate unique key
          color="#ffff"
          size={24}
          style={{ marginRight: '5px' }}
        />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  totalStars: PropTypes.number.isRequired,
};

export default StarRating;
