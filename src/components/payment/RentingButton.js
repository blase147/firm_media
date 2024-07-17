// src/components/payment/PaymentButton.js
import React from 'react';
import PropTypes from 'prop-types';
import { usePaystackPayment } from 'react-paystack';

const PaymentButton = ({
  amount, email, value, onSuccess,
}) => {
  const config = {
    reference: (new Date()).getTime().toString(),
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEYY, // Replace with your Paystack public key
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    initializePayment(onSuccess, (error) => {
      console.log(error);
    });
  };

  return (
    <button type="button" onClick={handlePayment}>
      {value}
    </button>
  );
};

PaymentButton.propTypes = {
  amount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default PaymentButton;
