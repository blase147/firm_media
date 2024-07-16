import React, { useState, useEffect } from 'react';
import { getBookings } from '../services/api'; // Ensure the correct path to the api file
import './BookingList.scss'; // Import your SCSS file

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBookings(); // Fetch bookings data
        setBookings(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (err) {
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="bookings-list-container">
      {loading && <p className="loading-message">Loading...</p>}
      {error && (
      <p className="error-message">
        Error:
        {error}
      </p>
      )}
      {!loading && !error && bookings.length === 0 && <p className="no-bookings-message">No bookings found.</p>}
      <ul className="bookings-list">
        {bookings.map((booking) => {
          const formattedDate = new Date(booking.date).toLocaleDateString();
          const time = new Date(booking.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <li key={booking.id} className="booking-item">
              <p style={{ color: 'white' }}>
                <span className="booking-service">{booking.service}</span>
                <span className="booking-details">
                  on
                  {' '}
                  <span className="booking-date">{formattedDate}</span>
                  {' '}
                  at
                  {' '}
                  <span className="booking-time">{time}</span>
                  {' '}
                  for
                  {' '}
                  <span className="booking-duration">{booking.duration}</span>
                  {' '}
                  hours
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookingsList;
