import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, cancelBooking } from '../../Redux/Reducers/bookingSlice';
import './bookings.scss'; // Import the SCSS file

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.bookings);
  const { currentUser } = useSelector((state) => state.auth);

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
  const handleUpdateBooking = (id) => {
    console.log(`Update booking with ID: ${id}`);
    // Add your update logic here
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
                  {/* {booking.status || 'N/A'} */}
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleUpdateBooking(booking.id)}
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
