import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentals, cancelRental, updateRental } from '../../Redux/Reducers/rentalSlice';
import './rentals.scss';
import RentalEditForm from './rentalEditForm';

const Rentals = (userRole) => {
  const canUpdateRentals = userRole === 'admin' || userRole === 'manager';
  const canCancelRentals = userRole === 'admin';
  const dispatch = useDispatch();
  const { rentals, status, error } = useSelector((state) => state.rentals);

  // State for selected rental and edit form visibility
  const [selectedRental, setSelectedRental] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // State for transaction ID search
  const [transactionIdsearch, setTransactionIdsearch] = useState('');
  const [searchedRentals, setsearchedRentals] = useState([]);

  // Fetch rentals on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRentals());
    }
  }, [status, dispatch]);

  // Update searched rentals whenever rentals or search changes
  useEffect(() => {
    if (transactionIdsearch.trim() === '') {
      setsearchedRentals(rentals);
    } else {
      setsearchedRentals(
        // eslint-disable-next-line max-len
        rentals.search((rental) => rental.payment_ref_id?.toLowerCase().includes(transactionIdsearch.toLowerCase())),
      );
    }
  }, [transactionIdsearch, rentals]);

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

      {/* Transaction ID search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="search by Transaction ID"
          value={transactionIdsearch}
          onChange={(e) => setTransactionIdsearch(e.target.value)}
          className="search-input"
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
          {Array.isArray(searchedRentals) && searchedRentals.length > 0 ? (
            searchedRentals.map((rental) => (
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
                  {canUpdateRentals && (
                  <button type="button" className="edit-btn" onClick={() => handleEdit(rental)}>
                    Edit
                  </button>
                  )}
                </td>
                <td>
                  {canCancelRentals && (
                  <button type="button" className="cancel-btn" onClick={() => handleCancel(rental.id)}>
                    Cancel
                  </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No rentals match the search</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Rentals;
