import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './receipt.scss';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';

const Receipt = ({
  paymentReference,
  gear,
  rentalDateTime,
  rentalDuration,
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    setIsLoading(false); // Set loading to false once the user data is fetched
  }, [dispatch]);

  const cumulativePrice = gear.pricePerHour * gear.rentalDuration || 0;

  // Function to format date (if valid)
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Download functionality not implemented yet!');
  };

  const handleShare = () => {
    alert('Share functionality not implemented yet!');
  };

  // Ensure rental data is properly handled
  const formattedRentalDate = rentalDateTime ? formatDate(rentalDateTime) : 'N/A';
  const rentalEndDateTime = rentalDateTime
    ? new Date(new Date(rentalDateTime).getTime() + rentalDuration * 60 * 60 * 1000)
    : null;
  const formattedRentalEndDate = rentalEndDateTime ? formatDate(rentalEndDateTime) : 'N/A';

  if (isLoading) return <p>Loading...</p>; // Display loading text while user data is being fetched

  return (
    <div className="receipt">
      <h2>Rental Receipt</h2>
      <img
        src={gear.imageUrl || 'https://via.placeholder.com/150'}
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
        {gear.id || 'N/A'}
      </p>
      <p>
        <strong>Gear Type:</strong>
        {' '}
        {gear.gearType || 'N/A'}
      </p>
      <p>
        <strong>Description:</strong>
        {' '}
        {gear.description || 'N/A'}
      </p>
      <p>
        <strong>Price per Hour:</strong>
        {' '}
        ₦
        {gear.pricePerHour?.toLocaleString() || 'N/A'}
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
        {currentUser?.full_name || 'N/A'}
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

// Define PropTypes
Receipt.propTypes = {
  paymentReference: PropTypes.string.isRequired,
  gear: PropTypes.shape({
    id: PropTypes.number.isRequired,
    gearType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pricePerHour: PropTypes.number.isRequired,
    rentalDuration: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  rentalDateTime: PropTypes.string.isRequired,
  rentalDuration: PropTypes.number.isRequired,
};

export default Receipt;
