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
            <th>Payment Ref ID</th>
            <th>Gear ID</th>
            <th>Service</th>
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
          {Array.isArray(bookings) && bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.payment_ref_id || 'N/A'}</td>
              <td>{booking.gear_id || 'N/A'}</td>
              <td>{booking.service || 'N/A'}</td>
              <td>{booking.plan || 'N/A'}</td>
              <td>{currentUser?.full_name || 'N/A'}</td>
              <td>{currentUser?.email || 'N/A'}</td>
              <td>{currentUser?.phone || 'N/A'}</td>
              <td>
                {booking.booking_datetime
                  ? new Date(booking.booking_datetime).toLocaleString()
                  : 'N/A'}
              </td>
              <td>
                {booking.booking_duration
                  ? `${booking.booking_duration} hour(s)`
                  : 'N/A'}
              </td>
              <td>
                {booking.booking_end_datetime
                  ? new Date(booking.booking_end_datetime).toLocaleString()
                  : 'N/A'}
              </td>
              <td>{booking.is_booked_now ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
