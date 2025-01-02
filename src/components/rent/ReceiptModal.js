import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './receipt.scss';

const ReceiptModal = ({ onClose }) => {
  const { rentalId } = useParams(); // Get rentalId from URL
  const [rentalData, setRentalData] = useState(null); // Renamed state to avoid conflict
  // eslint-disable-next-line max-len
  const { rentals = [], gears = [] } = useSelector((state) => state.rentals); // Safe destructuring with default values

  useEffect(() => {
    if (!rentalId) return;

    // Find the rental based on the rentalId
    const rentalDetails = rentals.find((rental) => rental.id === parseInt(rentalId, 10));
    setRentalData(rentalDetails);
  }, [rentalId, rentals]);

  if (!rentalData) {
    return <div>Rental not found.</div>;
  }

  // Get the gear details using gearId
  const gear = gears.find((gear) => gear.id === rentalData.gearId);

  if (!gear) {
    return <div>Gear not found.</div>;
  }

  const {
    user, rentalDatetime, rentalDuration, rentalEndDatetime, id,
  } = rentalData;
  const pricePerHour = gear?.pricePerHour || 0;
  const cumulativePrice = pricePerHour * rentalDuration || 0;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
  };

  const formattedRentalDate = rentalDatetime ? formatDate(rentalDatetime) : 'N/A';
  const formattedRentalEndDate = rentalEndDatetime ? formatDate(rentalEndDatetime) : 'N/A';

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Download functionality not implemented yet!');
  };

  const handleShare = () => {
    alert('Share functionality not implemented yet!');
  };

  return (
    <div className="receipt-modal">
      <div className="modal-content">
        <button type="button" className="close-btn" onClick={onClose}>X</button>
        <h2>Rental Receipt</h2>
        <p>
          <strong>Rental ID:</strong>
          {' '}
          {id}
        </p>
        <img
          src={gear?.imageUrl || 'https://via.placeholder.com/150'}
          alt="Gear"
          className="gear-image"
        />
        <p>
          <strong>Gear ID:</strong>
          {' '}
          {gear?.id || 'N/A'}
        </p>
        <p>
          <strong>Gear Type:</strong>
          {' '}
          {gear?.gearType || 'N/A'}
        </p>
        <p>
          <strong>Description:</strong>
          {' '}
          {gear?.description || 'N/A'}
        </p>
        <p>
          <strong>Price per Hour:</strong>
          {' '}
          ₦
          {pricePerHour.toLocaleString() || 'N/A'}
        </p>
        <p>
          <strong>Cumulative Price:</strong>
          {' '}
          ₦
          {cumulativePrice.toLocaleString()}
        </p>
        <p>
          <strong>User Name:</strong>
          {' '}
          {user?.fullName || 'N/A'}
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
          <strong>Rental End Date:</strong>
          {' '}
          {formattedRentalEndDate}
        </p>
        <div className="receipt-buttons">
          <button type="button" onClick={handlePrint}>Print</button>
          <button type="button" onClick={handleDownload}>Download</button>
          <button type="button" onClick={handleShare}>Share</button>
        </div>
      </div>
    </div>
  );
};

ReceiptModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ReceiptModal;
