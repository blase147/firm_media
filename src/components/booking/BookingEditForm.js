import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch } from 'react-redux';
import { updateBooking } from '../../Redux/Reducers/bookingSlice';
import './bookingEditForm.scss'; // Import the SCSS file for styles

const BookingEditForm = ({ booking, onClose }) => {
  const dispatch = useDispatch();

  // Local state to handle the form input
  const [updatedBooking, setUpdatedBooking] = useState(booking);

  useEffect(() => {
    setUpdatedBooking(booking); // Update form state if booking changes
  }, [booking]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBooking(updatedBooking));
    onClose(); // Close the form after submitting
  };

  return (
    <div className="booking-edit-form">
      <h3>Edit Booking</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="service">
            Service
            <select
              id="service"
              name="service"
              value={updatedBooking.service || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a service</option>
              <option value="Wedding">Wedding</option>
              <option value="Portrait">Portrait</option>
              <option value="Corporate">Corporate</option>
              <option value="Event">Event</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="plan">
            Plan
            <select
              id="plan"
              name="plan"
              value={updatedBooking.plan || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a plan</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone
            <input
              type="tel"
              id="phone"
              name="phone"
              value={updatedBooking.phone || ''}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="duration">
            Duration (hours)
            <input
              type="number"
              id="duration"
              name="duration"
              value={updatedBooking.duration || ''}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="date">
            Booking Date
            <input
              type="date"
              id="date"
              name="date"
              value={updatedBooking.date ? new Date(updatedBooking.date).toISOString().slice(0, 10) : ''}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <button type="submit">Update Booking</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

// Define prop types
BookingEditForm.propTypes = {
  booking: PropTypes.shape({
    service: PropTypes.string,
    plan: PropTypes.string,
    phone: PropTypes.string,
    duration: PropTypes.number,
    date: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookingEditForm;
