import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Ensure proper import
import { fetchBookings, cancelBooking } from '../../Redux/Reducers/bookingSlice';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import BookingEditForm from './bokingEditForm'; // Import the new component
import './bookings.scss'; // Import the SCSS file

const Bookings = (userRole) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Ensure this is declared correctly

  const { bookings, status, error } = useSelector((state) => state.bookings);
  const currentUser = useSelector((state) => state.auth.currentUser) || {};

  const canUpdateBooking = currentUser?.role === 'admin' || userRole === 'manager';
  const canCancelBooking = currentUser?.role === 'admin';

  // State to handle showing the edit form
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // State to handle the search query
  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(true);

  // Fetch Bookings
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBookings());
    }
    dispatch(fetchCurrentUser())
      .then(() => {
        setLoading(false); // Set loading to false after user data is fetched
        console.log('Current User fetched:', currentUser); // Check if currentUser is being fetched correctly
        console.log('User Role:', currentUser?.role); // Log the role value
      })
      .catch((error) => {
        setLoading(false); // Stop loading even if there's an error
        console.error('Error fetching current user:', error);
      });
  }, [status, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching user data
  }

  // Handle Row Click (Navigate to Receipt Page)
  const handleRowClick = (bookingId) => {
    if (bookingId) {
      navigate(`/receipt/${bookingId}`);
    } else {
      console.warn('Booking ID is missing. Navigation skipped.');
    }
  };

  // Handle Booking Cancellation
  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelBooking(id));
    }
  };

  // Handle Booking Update
  const handleUpdateBooking = (booking) => {
    setIsEditing(true);
    setSelectedBooking(booking); // Set the selected booking for editing
  };

  // Close the edit form
  const handleCloseEditForm = () => {
    setIsEditing(false);
    setSelectedBooking(null);
  };

  // Filter bookings based on search query
  // eslint-disable-next-line max-len
  const filteredBookings = bookings.filter((booking) => booking.payment_ref_id?.toLowerCase().includes(searchQuery.toLowerCase()));

  if (status === 'loading') return <div className="loading">Loading...</div>;
  if (status === 'failed') {
    return (
      <div className="error">
        Error:
        {error}
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <h2>Bookings</h2>

      {/* Search by Transaction ID */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Transaction ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Show the edit form if in editing state */}
      {isEditing && selectedBooking && (
        <BookingEditForm booking={selectedBooking} onClose={handleCloseEditForm} />
      )}

      <table className="b_table">
        <thead>
          <tr>
            <th>Ref ID</th>
            <th>Service</th>
            <th>Plan</th>
            <th>Customer&apos;s Phone</th>
            <th>User&apos;s Full Name</th>
            <th>Customer&apos;s Email</th>
            <th>Booking Date</th>
            <th>Booking Duration</th>
            <th>Booking End Time</th>
            <th>Status/Edit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <tr
                key={booking.id}
                onClick={(e) => {
                  if (e.target.tagName !== 'BUTTON') handleRowClick(booking.id);
                }}
                style={{
                  cursor: booking?.service ? 'pointer' : 'not-allowed',
                  opacity: booking?.service ? 1 : 0.6,
                }}
              >
                <td>{booking.payment_ref_id || 'N/A'}</td>
                <td>{booking.service || 'N/A'}</td>
                <td>{booking.plan || 'N/A'}</td>
                <td>{currentUser ? booking.phone : 'N/A'}</td>
                <td>{currentUser?.full_name || 'N/A'}</td>
                <td>{currentUser?.email || 'N/A'}</td>
                <td>
                  {booking.date
                    ? new Date(booking.date).toLocaleString()
                    : 'N/A'}
                </td>
                <td>
                  {booking.duration ? `${booking.duration} hour(s)` : 'N/A'}
                </td>
                <td>
                  {booking.time
                    ? new Date(booking.time).toLocaleString()
                    : 'N/A'}
                </td>
                <td>
                  {canUpdateBooking && (
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateBooking(booking);
                    }}
                  >
                    Edit
                  </button>
                  )}
                </td>
                <td>
                  { canCancelBooking && booking.status !== 'Cancelled' ? (
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelBooking(booking.id);
                      }}
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="cancelled">Cancelled</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No bookings available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
