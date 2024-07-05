import React from 'react';
import PropTypes from 'prop-types';
import PaystackPop from '@paystack/inline-js';

const PaymentButton = ({ amount, email, onSuccess }) => {
  const handlePayment = () => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_bd0def46d2f05d8fa2c663a54ea21a32d6297629',
      amount,
      email,
      onSuccess: (transaction) => {
        alert(`Payment Successful! Reference: ${transaction.reference}`);
        onSuccess(); // Call the onSuccess callback
      },
      onCancel: () => {
        alert('Payment Cancelled');
      },
    });
  };

  return (
    <button type="button" onClick={handlePayment}>
      Pay
      {' '}
      {amount / 100}
      {' '}
      Naira
    </button>
  );
};

PaymentButton.propTypes = {
  amount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default PaymentButton;
