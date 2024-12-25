import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../Redux/Reducers/bookingSlice';
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
      <table>
        <thead>
          <tr>
            <th>Ref ID</th>
            <th>Service</th>
            <th>Plan</th>
            <th>Plan</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Customer Phone</th>
            <th>Booking Date</th>
            <th>Booking Duration</th>
            <th>Booking End Time</th>
            <th>Is Rented</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.payment_ref_id || 'N/A'}</td>
                <td>{booking.service || 'N/A'}</td>
                <td>{booking.plan || 'N/A'}</td>
                <td>{currentUser ? currentUser.full_name : 'N/A'}</td>
                <td>{currentUser ? currentUser.email : 'N/A'}</td>
                <td>{currentUser ? currentUser.phone : 'N/A'}</td>
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
                <td>{booking.is_booked_now ? 'Yes' : 'No'}</td>
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
