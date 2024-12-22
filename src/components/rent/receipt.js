import PropTypes from 'prop-types';
import React from 'react';
import './receipt.scss';

const Receipt = ({
  paymentReference,
  gear,
  user,
  rentalDateTime,
  rentalDuration,
  rentalEndDateTime,
  pricePerHour,
}) => {
  console.log({
    paymentReference,
    gear,
    user,
    rentalDateTime,
    rentalDuration,
    rentalEndDateTime,
    pricePerHour,
  });

  // Calculate cumulative price, ensuring both pricePerHour and rentalDuration are valid numbers
  const cumulativePrice = (pricePerHour && rentalDuration && !Number.isNaN(pricePerHour)
  && !Number.isNaN(rentalDuration))
    ? pricePerHour * rentalDuration
    : 0;

  // Function to format date (if valid)
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toString() === 'Invalid Date' ? 'N/A' : date.toLocaleString();
  };

  const handlePrint = () => {
    window.print(); // Or implement custom print logic
  };

  const handleDownload = () => {
    alert('Download functionality not implemented yet!');
  };

  const handleShare = () => {
    alert('Share functionality not implemented yet!');
  };

  // Fallback image if gear's imageUrl is missing
  const gearImage = gear?.imageUrl || '/src/components/images/jpeg/camera.jpeg';

  // Fallback values for missing gear data
  const gearId = gear?.id || 'N/A';
  const gearType = gear?.gearType || 'N/A';
  const gearDescription = gear?.description || 'N/A';
  const gearPricePerHour = gear?.pricePerHour || 'N/A';

  // Ensure user and rental data are properly handled
  const userFullName = user?.full_name || 'N/A';
  const formattedRentalDate = rentalDateTime ? formatDate(rentalDateTime) : 'N/A';
  const formattedRentalEndDate = rentalEndDateTime ? formatDate(rentalEndDateTime) : 'N/A';

  return (
    <div className="receipt">
      <h2>Rental Receipt</h2>
      <img
        src={gearImage}
        alt="Gear"
        className="gear-image"
      />
      <p>
        <strong>Payment Reference:</strong>
        {' '}
        {paymentReference || 'N/A'}
      </p>
      <p>
        <strong>Gear ID:</strong>
        {' '}
        {gearId}
      </p>
      <p>
        <strong>Gear Type:</strong>
        {' '}
        {gearType}
      </p>
      <p>
        <strong>Description:</strong>
        {' '}
        {gearDescription}
      </p>
      <p>
        <strong>Price per Hour:</strong>
        {' '}
        ₦
        {gearPricePerHour}
      </p>
      <p>
        <strong>Cumulative Price:</strong>
        {' '}
        ₦
        {cumulativePrice.toLocaleString()}
      </p>
      <p>
        <strong>Customer Name:</strong>
        {' '}
        {userFullName}
      </p>
      <p>
        <strong>Rental Date:</strong>
        {' '}
        {formattedRentalDate}
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
        {formattedRentalEndDate}
      </p>
      <div className="receipt-buttons">
        <button type="button" onClick={handlePrint}>Print</button>
        <button type="button" onClick={handleDownload}>Download</button>
        <button type="button" onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

// Define the specific shape of the gear and user objects
Receipt.propTypes = {
  paymentReference: PropTypes.string.isRequired,
  gear: PropTypes.shape({
    id: PropTypes.number.isRequired,
    gearType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pricePerHour: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
  }).isRequired,
  rentalDateTime: PropTypes.string.isRequired,
  rentalDuration: PropTypes.number.isRequired,
  rentalEndDateTime: PropTypes.string.isRequired,
  pricePerHour: PropTypes.number.isRequired,
};

export default Receipt;
