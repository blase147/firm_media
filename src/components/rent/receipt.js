import React, { useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import './receipt.scss';

const Receipt = ({ equipment, paymentReference }) => {
  const receiptRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([receiptRef.current.innerHTML], {
      type: 'text/html',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'receipt.html';
    document.body.appendChild(element);
    element.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Equipment Rental Receipt',
          text: 'Check out the details of my rental receipt',
          url: window.location.href,
        })
        .catch((error) => console.error('Error sharing', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const cumulativePrice = equipment.price_per_hour * equipment.hours;

  return (
    <div className="receipt" ref={receiptRef}>
      <img src="/path/to/logo.png" alt="Logo" className="logo" />
      <h2>Rental Receipt</h2>
      <p>
        <strong>Payment Reference:</strong>
        {' '}
        {paymentReference}
      </p>
      <p>
        <strong>Equipment Name:</strong>
        {' '}
        {equipment.name}
      </p>
      <p>
        <strong>Type:</strong>
        {' '}
        {equipment.type}
      </p>
      <p>
        <strong>Price per Hour:</strong>
        {' '}
        {equipment.price_per_hour}
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
        <strong>Description:</strong>
        {' '}
        {equipment.description}
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
  equipment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price_per_hour: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  paymentReference: PropTypes.string.isRequired,
};

export default Receipt;
