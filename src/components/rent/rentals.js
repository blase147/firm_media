import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentals } from '../../Redux/Reducers/rentalSlice';
import RentalEditForm from './rentalEditForm'; // Import your RentalEditForm component
import './rentals.scss'; // Import the SCSS file

const Rentals = () => {
  const dispatch = useDispatch();
  const { rentals, status, error } = useSelector((state) => state.rentals);
  const [editingRental, setEditingRental] = useState(null); // State for editing rental

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

  const handleEditClick = (rental) => {
    setEditingRental(rental); // Set the rental to be edited
  };

  const handleCancelEdit = () => {
    setEditingRental(null); // Close the edit form
  };

  return (
    <div className="rentals-container">
      <h2>Rentals</h2>

      {/* Render the RentalEditForm if editingRental is not null */}
      {editingRental && (
        <div className="edit-form-overlay">
          <RentalEditForm rental={editingRental} onClose={handleCancelEdit} />
        </div>
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
            <th>Is Rented</th>
            <th>Actions</th>
            {' '}
            {/* Added actions column */}
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
              <button type="button" onClick={handleCancelEdit}>Cancel</button>
              <td>{rental.is_rented_now ? 'Yes' : 'No'}</td>
              <td>
                <button type="button" onClick={() => handleEditClick(rental)}>Edit</button>
                <button type="button" onClick={handleCancelEdit}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rentals;
