import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentals } from '../../Redux/Reducers/rentalSlice';
import './receipt.scss';

const Receipt = ({ paymentReference }) => {
  const dispatch = useDispatch();
  const { rentals, status, error } = useSelector((state) => state.rentals);
  const [rentalDetails, setRentalDetails] = useState(null);

  // Fetch rental data when the component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRentals());
    }
  }, [status, dispatch]);

  // Match payment reference with rentals
  useEffect(() => {
    if (Array.isArray(rentals) && paymentReference) {
      const rental = rentals.find(
        (r) => String(r.payment_ref_id).trim() === String(paymentReference).trim(),
      );

      if (rental) {
        console.log('✅ Matching Rental Found:', rental);
        setRentalDetails(rental);
      } else {
        console.warn('⚠️ No Rental Found for Reference:', paymentReference);
        console.warn('Available References:', rentals.map((r) => r.payment_ref_id));
        setRentalDetails(null);
      }
    }
  }, [rentals, paymentReference]);

  // Handle Loading State
  if (status === 'loading') return <div className="loading">Loading...</div>;

  // Handle Error State
  if (status === 'failed') {
    return (
      <div className="error">
        <strong>Error:</strong>
        {' '}
        {error || 'Failed to fetch rental details.'}
      </div>
    );
  }

  // Handle No Rental Found
  if (!rentalDetails) {
    return <div className="error">No rental found with the given payment reference.</div>;
  }

  // Destructure rental details
  const {
    gear = {},
    user = {},
    rental_datetime: rentalDateTime,
    rental_duration: rentalDuration,
    rental_end_datetime: rentalEndDateTime,
    is_rented_now: isRentedNow,
  } = rentalDetails || {};

  const pricePerHour = gear?.price_per_hour || 0;
  const cumulativePrice = pricePerHour * rentalDuration;

  // Print Receipt
  const handlePrint = () => window.print();

  // Download Receipt
  const handleDownload = () => {
    const receiptContent = `
      <html>
        <head><title>Rental Receipt</title></head>
        <body>
          <h2>Rental Receipt</h2>
          <p><strong>Payment Reference:</strong> ${paymentReference}</p>
          <p><strong>Gear ID:</strong> ${gear?.id || 'N/A'}</p>
          <p><strong>Gear Type:</strong> ${gear?.type || 'N/A'}</p>
          <p><strong>Price per Hour:</strong> ${pricePerHour} Naira</p>
          <p><strong>Cumulative Price:</strong> ${cumulativePrice} Naira</p>
          <p><strong>Customer Name:</strong> ${user?.full_name || 'N/A'}</p>
          <p><strong>Rental Date:</strong> ${new Date(rentalDateTime).toLocaleString()}</p>
          <p><strong>Rental Duration:</strong> ${rentalDuration} hour(s)</p>
          <p><strong>Rental End:</strong> ${new Date(rentalEndDateTime).toLocaleString()}</p>
          <p><strong>Is Rented:</strong> ${isRentedNow ? 'Yes' : 'No'}</p>
        </body>
      </html>
    `;
    const blob = new Blob([receiptContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rental_receipt_${paymentReference}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share Receipt
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Rental Receipt',
          text: 'Here are the details of my rental receipt.',
          url: window.location.href,
        })
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported on your browser.');
    }
  };

  return (
    <div className="receipt">
      <img
        src={gear?.image_url || '/path/to/default-image.png'}
        alt="Gear"
        className="gear-image"
      />
      <h2>Rental Receipt</h2>
      <p>
        <strong>Payment Reference:</strong>
        {' '}
        {paymentReference}
      </p>
      <p>
        <strong>Gear ID:</strong>
        {' '}
        {gear?.id || 'N/A'}
      </p>
      <p>
        <strong>Gear Type:</strong>
        {' '}
        {gear?.type || 'N/A'}
      </p>
      <p>
        <strong>Price per Hour:</strong>
        {' '}
        {pricePerHour}
        {' '}
        Naira
      </p>
      <p>
        <strong>Cumulative Price:</strong>
        {' '}
        {cumulativePrice}
        {' '}
        Naira
      </p>
      <p>
        <strong>Customer Name:</strong>
        {' '}
        {user?.full_name || 'N/A'}
      </p>
      <p>
        <strong>Rental Date:</strong>
        {' '}
        {new Date(rentalDateTime).toLocaleString()}
      </p>
      <p>
        <strong>Rental Duration:</strong>
        {' '}
        {rentalDuration}
        {' '}
        hour(s)
      </p>
      <p>
        <strong>Rental End:</strong>
        {' '}
        {new Date(rentalEndDateTime).toLocaleString()}
      </p>
      <p>
        <strong>Is Rented:</strong>
        {' '}
        {isRentedNow ? 'Yes' : 'No'}
      </p>
      <div className="receipt-buttons">
        <button type="button" onClick={handlePrint}>Print</button>
        <button type="button" onClick={handleDownload}>Download</button>
        <button type="button" onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

// PropTypes validation
Receipt.propTypes = {
  paymentReference: PropTypes.string.isRequired,
};

export default Receipt;
