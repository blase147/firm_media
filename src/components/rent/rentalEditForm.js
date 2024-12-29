import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateRental, fetchGears } from '../../Redux/Reducers/rentalSlice'; // Updated import
import './rentalEditForm.scss';

const RentalEditForm = ({ rental, onClose }) => {
  const dispatch = useDispatch();

  // Access gears from the rental slice
  const gears = useSelector((state) => state.rentals.gears || []);
  const isLoadingGears = useSelector((state) => state.rentals.loading);

  // Local state for rental and gear details
  const [updatedRental, setUpdatedRental] = useState(rental);
  const [gearDetails, setGearDetails] = useState(rental.gear || {});

  // Fetch gears if not already available
  useEffect(() => {
    setUpdatedRental(rental);
    if (!rental.gear?.name) {
      dispatch(fetchGears());
    }
  }, [rental, dispatch]);

  // Sync gear details once gears are fetched
  useEffect(() => {
    if (gears.length > 0 && rental.gear?.id) {
      const matchedGear = gears.find((gear) => gear.id === rental.gear.id);
      if (matchedGear) {
        setGearDetails(matchedGear);
      }
    }
  }, [gears, rental.gear?.id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRental((prevRental) => ({
      ...prevRental,
      [name]: value,
    }));
  };

  // Submit updated rental details
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRental({ rentalId: rental.id, updatedData: updatedRental }));
    onClose();
  };

  return (
    <div className="rental_edit_form_container">
      <h3>Edit Rental</h3>
      {isLoadingGears ? (
        <p>Loading gear details...</p>
      ) : (
        <form onSubmit={handleSubmit} className="rental_edit_form">
          {/* Gear ID */}
          <div className="form-group">
            <label htmlFor="gearId">
              Gear ID
              <input
                type="text"
                id="gearId"
                name="gearId"
                value={updatedRental.gear?.id || ''}
                onChange={handleInputChange}
                disabled
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="customerName">
              Customer Name
              <input
                type="text"
                id="gearId"
                name="gearId"
                value={updatedRental.user?.full_name || ''}
                onChange={handleInputChange}
                disabled
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="gearName">
              Gear Name
              <input
                type="text"
                id="gearId"
                name="gearId"
                value={gearDetails.name || updatedRental.gear?.name || ''}
                onChange={handleInputChange}
                disabled
              />
            </label>
          </div>

          {/* Rental Date */}
          <div className="form-group">
            <label htmlFor="rentalDate">
              Rental Date
              <input
                type="datetime-local"
                id="rentalDate"
                name="rentalDate"
                value={
                  updatedRental.rental_datetime
                    ? new Date(updatedRental.rental_datetime).toISOString().slice(0, 19)
                    : ''
                }
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          {/* Rental Duration */}
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

          {/* Payment Reference */}
          <div className="form-group">
            <label htmlFor="paymentRef">
              Payment Reference ID
              <input
                type="text"
                id="paymentRef"
                name="paymentRef"
                value={updatedRental.payment_ref_id || ''}
                onChange={handleInputChange}
                disabled
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="update_cancel_btns">
            <button type="submit">Update Rental</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

// Prop Types Validation
RentalEditForm.propTypes = {
  rental: PropTypes.shape({
    id: PropTypes.string.isRequired,
    gear: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
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
