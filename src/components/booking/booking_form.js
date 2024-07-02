import React, { useState } from 'react';
import { createBooking } from '../../services/api';
import BookingList from '../BookingsList';

const BookingForm = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleBooking = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    setError(null);
    setSuccess(null);
    const bookingData = {
      service, date, duration, name, email,
    };
    try {
      await createBooking(bookingData);
      setSuccess('Booking created successfully!');
    } catch (err) {
      setError('Failed to create booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleBooking}>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Service"
          required
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          required
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (hours)"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Book and Pay</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && (
      <p style={{ color: 'red' }}>
        Error:
        {error}
      </p>
      )}
      {success && (
      <p style={{ color: 'green' }}>
        Success:
        {success}
      </p>
      )}

      <BookingList />
    </div>
  );
};

export default BookingForm;
