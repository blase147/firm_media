import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateRental } from '../../Redux/Reducers/rentalSlice'; // Assuming there's an updateRental action
import './rentalEditForm.scss'; // Import the SCSS file for styles

const RentalEditForm = ({ rental, onClose }) => {
  const dispatch = useDispatch();

  // Local state to handle the form input
  const [updatedRental, setUpdatedRental] = useState(rental);

  useEffect(() => {
    setUpdatedRental(rental); // Update form state if rental changes
  }, [rental]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRental((prevRental) => ({
      ...prevRental,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the update action with rentalId and updatedData
    dispatch(updateRental({ rentalId: rental.id, updatedData: updatedRental }));
    onClose(); // Close the form after submitting
  };

  return (
    <div className="rental-edit-form">
      <h3>Edit Rental</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gearId">
            Gear ID
            <input
              type="text"
              id="gearId"
              name="gearId"
              value={updatedRental.gear?.id || ''}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="customerName">
            Customer Name
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={updatedRental.user?.full_name || ''}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="rentalDate">
            Rental Date
            <input
              type="datetime-local"
              id="rentalDate"
              name="rentalDate"
              value={updatedRental.rental_datetime ? new Date(updatedRental.rental_datetime).toISOString().slice(0, 19) : ''}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="rentalDuration">
            Rental Duration (hours)
            <input
              type="number"
              id="rentalDuration"
              name="rentalDuration"
              value={updatedRental.rental_duration || ''}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="rentalEnd">
            Rental End
            <input
              type="datetime-local"
              id="rentalEnd"
              name="rentalEnd"
              value={updatedRental.rental_end_datetime ? new Date(updatedRental.rental_end_datetime).toISOString().slice(0, 19) : ''}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="paymentRef">
            Payment Reference ID
            <input
              type="text"
              id="paymentRef"
              name="paymentRef"
              value={updatedRental.payment_ref_id || ''}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="isRented">
            Is Rented Now
            <select
              id="isRented"
              name="isRented"
              value={updatedRental.is_rented_now ? 'Yes' : 'No'}
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <button type="submit">Update Rental</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

// Define prop types
RentalEditForm.propTypes = {
  rental: PropTypes.shape({
    id: PropTypes.string.isRequired, // Ensure id is required
    gear: PropTypes.shape({
      id: PropTypes.string,
    }),
    user: PropTypes.shape({
      full_name: PropTypes.string,
    }),
    rental_datetime: PropTypes.string,
    rental_duration: PropTypes.number,
    rental_end_datetime: PropTypes.string,
    payment_ref_id: PropTypes.string,
    is_rented_now: PropTypes.bool,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RentalEditForm;
