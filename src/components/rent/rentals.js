import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentals, cancelRental, updateRental } from '../../Redux/Reducers/rentalSlice';
import './rentals.scss'; // Import the SCSS file

const Rentals = () => {
  const dispatch = useDispatch();
  const { rentals, status, error } = useSelector((state) => state.rentals);

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

  const handleCancel = (rentalId) => {
    dispatch(cancelRental(rentalId));
  };

  const handleUpdate = (rental) => {
    // Handle your update logic, potentially opening a modal or form
    dispatch(updateRental(rental));
  };

  return (
    <div className="rentals-container">
      <h2>Rentals</h2>
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
                <button type="button" onClick={() => handleUpdate(rental)}>Edit</button>
              </td>
              <td>
                <button type="button" onClick={() => handleCancel(rental.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rentals;
