import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PaystackPop from '@paystack/inline-js';

const PaymentButton = ({ amount, email, onSuccess }) => {
  const [error, setError] = useState(null);

  const handlePayment = () => {
    if (!amount || !email) {
      setError('Please fill in all required fields before proceeding with the payment.');
      return;
    }

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'your-public-key', // Replace with your Paystack public key
      amount,
      email,
      onSuccess: (transaction) => {
        alert(`Payment Successful! Reference: ${transaction.reference}`);
        onSuccess(transaction.reference); // Pass the payment reference to the parent component
      },
      onCancel: () => {
        alert('Payment Cancelled');
      },
    });
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <button type="button" onClick={handlePayment}>
        Pay
        {' '}
        {amount / 100}
        {' '}
        Naira
      </button>
    </div>
  );
};

PaymentButton.propTypes = {
  amount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default PaymentButton;
