import React, { useState, useEffect } from 'react';
import { getBookings } from '../services/api'; // Ensure the correct path to the api file

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
        setBookings(data); // Set the bookings state
      } catch (err) {
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Error:
          {' '}
          {error}
        </p>
      )}
      {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.service}
            {' '}
            on
            {new Date(booking.date).toLocaleString()}
            {' '}
            for
            {booking.duration}
            {' '}
            hours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsList;
