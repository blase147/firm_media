import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './receipt.scss'; // Import the SCSS file for styling

const Receipt = () => {
  const { bookingId } = useParams(); // Get bookingId from URL
  const [booking, setBooking] = useState(null);
  const { bookings } = useSelector((state) => state.bookings);

  useEffect(() => {
    // Find the booking based on the bookingId
    const bookingDetails = bookings.find((booking) => booking.id === parseInt(bookingId, 10));
    setBooking(bookingDetails);
  }, [bookingId, bookings]);

  if (!booking) {
    return <div>Booking not found.</div>;
  }

  return (
    <div className="receipt-container">
      <h2>
        Receipt for Booking #
        {booking.payment_ref_id}
      </h2>
      <div className="receipt-details">
        <div>
          <strong>Service:</strong>
          {' '}
          {booking.service || 'N/A'}
        </div>
        <div>
          <strong>Plan:</strong>
          {' '}
          {booking.plan || 'N/A'}
        </div>
        <div>
          <strong>Customer&apos;s Name:</strong>
          {' '}
          {booking.customer_name || 'N/A'}
        </div>
        <div>
          <strong>Customer&apos;s Phone:</strong>
          {' '}
          {booking.phone || 'N/A'}
        </div>
        <div>
          <strong>Customer&apos;s Email:</strong>
          {' '}
          {booking.email || 'N/A'}
        </div>
        <div>
          <strong>Booking Date:</strong>
          {' '}
          {booking.date ? new Date(booking.date).toLocaleString() : 'N/A'}
        </div>
        <div>
          <strong>Booking Duration:</strong>
          {' '}
          {booking.duration ? `${booking.duration} hour(s)` : 'N/A'}
        </div>
        <div>
          <strong>Booking End Time:</strong>
          {' '}
          {booking.time ? new Date(booking.time).toLocaleString() : 'N/A'}
        </div>
        <div>
          <strong>Status:</strong>
          {' '}
          {booking.status || 'N/A'}
        </div>
      </div>

      <div className="receipt-footer">
        <p>
          <strong>Total: </strong>
          $
          {booking.totalAmount || '0.00'}
        </p>
        <p>Thank you for your booking!</p>
      </div>
    </div>
  );
};

export default Receipt;
