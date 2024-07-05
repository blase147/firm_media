// PaymentButton.js

import React from 'react';
import PropTypes from 'prop-types';
import { PaystackButton } from 'react-paystack';

const PaymentButton = ({ amount, email }) => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_bd0def46d2f05d8fa2c663a54ea21a32d6297629'; // Use environment variable or hardcoded key
  const [success, setSuccess] = React.useState(false);

  const handlePaystackSuccessAction = (reference) => {
    setSuccess(true);
    console.log(reference);
    // Implement logic for successful payment handling (e.g., update booking status)
  };

  const handlePaystackCloseAction = () => {
    console.log('Payment closed');
    // Implement logic for when user closes the payment modal
  };

  return (
    <div>
      <PaystackButton
        email={email}
        amount={amount}
        publicKey={publicKey}
        text="Pay Now"
        onSuccess={handlePaystackSuccessAction}
        onClose={handlePaystackCloseAction}
      />
      {success && <p>Payment successful!</p>}
    </div>
  );
};

PaymentButton.propTypes = {
  amount: PropTypes.number.isRequired, // Ensure amount is required and a number
  email: PropTypes.string.isRequired, // Ensure email is required and a string
};

export default PaymentButton;
