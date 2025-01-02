import React from 'react';
import PropTypes from 'prop-types';
import './ReceiptModal.scss'; // Add your custom styling here

const ReceiptModal = ({ rental, onClose }) => {
  // Check if rental object is available before rendering
  if (!rental) {
    return <div className="receipt-modal">No rental details available</div>;
  }

  // Accessibility handler for the overlay
  const handleOverlayClick = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClose(); // Close on 'Enter' or 'Space' key press
    }
    if (event.type === 'click') {
      onClose(); // Close on mouse click
    }
  };

  return (
    <div className="receipt-modal">
      <div
        className="modal-overlay"
        onClick={handleOverlayClick} // Click event
        onKeyDown={handleOverlayClick} // Keyboard event (to catch 'Enter' and 'Space')
        role="button" // Make the div behave like a button
        tabIndex="0" // Make it focusable and part of the tabbing sequence
        aria-label="Close modal"
      />
      <div className="modal-content">
        <button type="button" className="close-btn" onClick={onClose}>X</button>
        <h3>
          Receipt for Rental #
          {rental.id}
        </h3>
        <p>
          <strong>Customer Name:</strong>
          {' '}
          {rental.user?.full_name || 'N/A'}
        </p>
        <p>
          <strong>Rental Date:</strong>
          {' '}
          {new Date(rental.rental_datetime).toLocaleString()}
        </p>
        <p>
          <strong>Rental Duration:</strong>
          {' '}
          {rental.rental_duration}
          {' '}
          hour(s)
        </p>
        <p>
          <strong>Rental End:</strong>
          {' '}
          {new Date(rental.rental_end_datetime).toLocaleString()}
        </p>
        <p>
          <strong>Payment Ref ID:</strong>
          {' '}
          {rental.payment_ref_id || 'N/A'}
        </p>
        <p>
          <strong>Amount Paid:</strong>
          {' '}
          $
          {rental.amount_paid ? rental.amount_paid.toFixed(2) : 'N/A'}
        </p>
        <p>
          <strong>Status:</strong>
          {' '}
          {rental.is_rented_now ? 'In use now' : 'Not in use yet'}
        </p>
        {/* Add more rental details as needed */}
      </div>
    </div>
  );
};

// Prop validation using PropTypes
ReceiptModal.propTypes = {
  rental: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      full_name: PropTypes.string,
    }),
    rental_datetime: PropTypes.string.isRequired,
    rental_duration: PropTypes.number.isRequired,
    rental_end_datetime: PropTypes.string.isRequired,
    payment_ref_id: PropTypes.string,
    amount_paid: PropTypes.number,
    is_rented_now: PropTypes.bool.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

// Default props to avoid missing rental prop
ReceiptModal.defaultProps = {
  rental: null,
};

export default ReceiptModal;
