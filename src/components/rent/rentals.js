import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentals, cancelRental, updateRental } from '../../Redux/Reducers/rentalSlice';
import './rentals.scss'; // Import the SCSS file
import RentalEditForm from './rentalEditForm';

const Rentals = () => {
  const dispatch = useDispatch();
  const { rentals, status, error } = useSelector((state) => state.rentals);

  // State to handle selected rental and edit form visibility
  const [selectedRental, setSelectedRental] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch rentals
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRentals());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div className="loading">Loading...</div>;
  if (status === 'failed') {
    return (
      <div className="error">
        Error:
        {error}
      </div>
    );
  }

  // Cancel a rental
  const handleCancel = (rentalId) => {
    dispatch(cancelRental(rentalId));
  };

  // Open edit form with selected rental
  const handleEdit = (rental) => {
    setSelectedRental(rental);
    setIsEditing(true);
  };

  // Update a rental
  const handleUpdate = () => {
    if (!selectedRental) {
      console.error('No rental selected for update');
      return;
    }

    const updatedData = { status: 'active' }; // Example payload

    console.log('Dispatching updateRental with:', selectedRental.id, updatedData);
    dispatch(updateRental({ rentalId: selectedRental.id, updatedData }));
    setIsEditing(false);
  };

  // Close the edit form
  const handleCloseEditForm = () => {
    setIsEditing(false);
    setSelectedRental(null);
  };

  return (
    <div className="rentals-container">
      <h2>Rentals</h2>

      {/* Show the edit form if in editing state */}
      {isEditing && selectedRental && (
        <RentalEditForm
          rental={selectedRental} // Pass the selected rental directly
          gear={selectedRental.gear} // Pass the gear object directly from rental
          onClose={handleCloseEditForm}
          onUpdate={handleUpdate}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Rental ID</th>
            <th>Gear ID</th>
            <th>Customer Name</th>
            <th>Rental Date</th>
            <th>Rental Duration</th>
            <th>Rental End</th>
            <th>Payment Ref</th>
            <th>In Use Status</th>
            <th>Edit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rentals) && rentals.map((rental) => (
            <tr key={rental.id}>
              <td>{rental.id}</td>
              <td>{rental.gear?.id || 'N/A'}</td>
              <td>{rental.user?.full_name || 'N/A'}</td>
              <td>{new Date(rental.rental_datetime).toLocaleString()}</td>
              <td>
                {rental.rental_duration}
                {' '}
                hour(s)
              </td>
              <td>{new Date(rental.rental_end_datetime).toLocaleString()}</td>
              <td>
                {rental.payment_ref_id}
              </td>
              <td>{rental.is_rented_now ? 'In use now' : 'Not in use yet'}</td>
              <td>
                <button type="button" className="edit-btn" onClick={() => handleEdit(rental)}>Edit</button>
              </td>
              <td>
                <button type="button" className="cancel-btn" onClick={() => handleCancel(rental.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rentals;
