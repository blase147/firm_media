// src/components/BookingsList.js
import React, { useState, useEffect } from 'react';
import { getBookings } from '../services/api';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getBookings();
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && (
      <p>
        Error:
        {error}
      </p>
      )}
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
