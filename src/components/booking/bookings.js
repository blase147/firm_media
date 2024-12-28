import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, cancelBooking } from '../../Redux/Reducers/bookingSlice';
// import BookingEditForm from './bookingEditForm'; // Import the new component
import './bookings.scss'; // Import the SCSS file

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.bookings);
  const { currentUser } = useSelector((state) => state.auth);

  // State to handle showing the edit form
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch Bookings
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBookings());
    }
  }, [status, dispatch]);

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

  if (status === 'loading') return <div className="loading">Loading...</div>;
  if (status === 'failed') {
    return (
      <div className="error">
        Error:
        {' '}
        {error}
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <h2>Bookings</h2>
      {/* <form
      <input
      type="text"
      id="search"
      value=setSearch()
      />
      <input
      type="submit"
      value="Search Transaction with Reference"
      />
    </form>
/}
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
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
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
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleUpdateBooking(booking)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  {booking.status !== 'Cancelled' ? (
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => handleCancelBooking(booking.id)}
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
