import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentals, cancelRental, updateRental } from '../../Redux/Reducers/rentalSlice';
import './rentals.scss';
import RentalEditForm from './rentalEditForm';

const Rentals = () => {
  const dispatch = useDispatch();
  const { rentals, status, error } = useSelector((state) => state.rentals);

  // State for selected rental and edit form visibility
  const [selectedRental, setSelectedRental] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // State for transaction ID filter
  const [transactionIdFilter, setTransactionIdFilter] = useState('');
  const [filteredRentals, setFilteredRentals] = useState([]);

  // Fetch rentals on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRentals());
    }
  }, [status, dispatch]);

  // Update filtered rentals whenever rentals or filter changes
  useEffect(() => {
    if (transactionIdFilter.trim() === '') {
      setFilteredRentals(rentals);
    } else {
      setFilteredRentals(
        // eslint-disable-next-line max-len
        rentals.filter((rental) => rental.payment_ref_id?.toLowerCase().includes(transactionIdFilter.toLowerCase())),
      );
    }
  }, [transactionIdFilter, rentals]);

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

  // Open edit form
  const handleEdit = (rental) => {
    setSelectedRental(rental);
    setIsEditing(true);
  };

  // Update rental
  const handleUpdate = () => {
    if (!selectedRental) {
      console.error('No rental selected for update');
      return;
    }

    const updatedData = { status: 'active' };
    dispatch(updateRental({ rentalId: selectedRental.id, updatedData }));
    setIsEditing(false);
  };

  // Close edit form
  const handleCloseEditForm = () => {
    setIsEditing(false);
    setSelectedRental(null);
  };

  return (
    <div className="rentals-container">
      <h2>Rentals</h2>

      {/* Transaction ID Filter */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by Transaction ID"
          value={transactionIdFilter}
          onChange={(e) => setTransactionIdFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      {/* Edit Form */}
      {isEditing && selectedRental && (
        <RentalEditForm
          rental={selectedRental}
          gear={selectedRental.gear}
          onClose={handleCloseEditForm}
          onUpdate={handleUpdate}
        />
      )}

      {/* Rentals Table */}
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
          {Array.isArray(filteredRentals) && filteredRentals.length > 0 ? (
            filteredRentals.map((rental) => (
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
                <td>{rental.payment_ref_id || 'N/A'}</td>
                <td>{rental.is_rented_now ? 'In use now' : 'Not in use yet'}</td>
                <td>
                  <button type="button" className="edit-btn" onClick={() => handleEdit(rental)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" className="cancel-btn" onClick={() => handleCancel(rental.id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No rentals match the filter</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Rentals;
