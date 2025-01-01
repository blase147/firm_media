import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentals, cancelRental, updateRental } from '../../Redux/Reducers/rentalSlice';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import './rentals.scss';
import RentalEditForm from './rentalEditForm';

const Rentals = () => {
  const dispatch = useDispatch();
  const { rentals, status, error } = useSelector((state) => state.rentals);
  const currentUser = useSelector((state) => state.auth.currentUser) || {};

  const [selectedRental, setSelectedRental] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [transactionIdSearch, setTransactionIdSearch] = useState('');
  const [searchedRentals, setSearchedRentals] = useState([]);
  const [loading, setLoading] = useState(true); // Added missing loading state

  const canUpdateRental = currentUser?.role === 'admin' || currentUser?.role === 'manager';
  const canCancelRental = currentUser?.role === 'admin';

  // Fetch current user on mount
  useEffect(() => {
    dispatch(fetchCurrentUser())
      .then(() => {
        setLoading(false); // Stop loading after user data is fetched
        console.log('Current User fetched:', currentUser);
        console.log('User Role:', currentUser?.role);
      })
      .catch((err) => {
        setLoading(false); // Stop loading even if there's an error
        console.error('Error fetching current user:', err);
      });
  }, [dispatch]);

  // Fetch rentals on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRentals());
    }
  }, [status, dispatch]);

  // Search rentals based on transaction ID
  useEffect(() => {
    if (transactionIdSearch.trim() === '') {
      setSearchedRentals(rentals);
    } else {
      setSearchedRentals(
        // eslint-disable-next-line max-len
        rentals.filter((rental) => rental.payment_ref_id?.toLowerCase().includes(transactionIdSearch.toLowerCase())),
      );
    }
  }, [transactionIdSearch, rentals]);

  if (loading || status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="error">
        Error:
        {' '}
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
          placeholder="Search by Transaction ID"
          value={transactionIdSearch}
          onChange={(e) => setTransactionIdSearch(e.target.value)}
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
                  {canUpdateRental && (
                    <button type="button" className="edit-btn" onClick={() => handleEdit(rental)}>
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  {canCancelRental && (
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
