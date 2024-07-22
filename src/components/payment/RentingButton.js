import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PaystackPop from '@paystack/inline-js';

const RentButton = ({
  amount,
  email,
  onProceedToPayment,
  onSuccess,
}) => {
  const [isAvailable, setIsAvailable] = useState(null); // null means not checked

  const handleClick = async () => {
    const available = await onProceedToPayment();
    setIsAvailable(available);

    if (available) {
      // Initialize Paystack payment
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
        email,
        amount,
        onSuccess: (transaction) => {
          console.log('Payment successful:', transaction);
          onSuccess(transaction);
        },
        onCancel: () => console.log('Payment cancelled'),
        onClose: () => console.log('Payment closed'),
      });
    }
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Rent Now
      </button>
      {isAvailable === false && <p>Gear is not available for the selected time and date.</p>}
    </div>
  );
};

RentButton.propTypes = {
  amount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  onProceedToPayment: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default RentButton;
