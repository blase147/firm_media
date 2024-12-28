import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const BookingEditForm = ({
  editFormData, handleInputChange, handleSave, handleCancel,
}) => (
  <tr>
    <td>
      <label htmlFor="service">Service</label>
      <input
        type="text"
        id="service"
        name="service"
        value={editFormData.service}
        onChange={handleInputChange}
      />
    </td>
    <td>
      <label htmlFor="plan">Plan</label>
      <input
        type="text"
        id="plan"
        name="plan"
        value={editFormData.plan}
        onChange={handleInputChange}
      />
    </td>
    <td>
      <label htmlFor="duration">Duration</label>
      <input
        type="text"
        id="duration"
        name="duration"
        value={editFormData.duration}
        onChange={handleInputChange}
      />
    </td>
    <td>
      <button type="button" onClick={handleSave} className="save-button">Save</button>
      <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
    </td>
  </tr>
);

// Prop validation using PropTypes
BookingEditForm.propTypes = {
  editFormData: PropTypes.shape({
    service: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default BookingEditForm;
