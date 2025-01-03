import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch, useSelector } from 'react-redux';
import { jsPDF } from 'jspdf'; // Import jsPDF
import './Receipt.scss';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import logo from '../images/png/Logo Silver.png';

const Receipt = ({ rental }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [currentUser, dispatch]);

  if (!rental) {
    return <div>Rental details are unavailable. Please try again later.</div>;
  }

  const {
    id: rentalIdValue = 'N/A',
    rental_datetime: rentalDate = 'N/A',
    rental_duration: rentalDuration = 0,
    rental_end_datetime: rentalEnd = 'N/A',
    payment_ref_id: paymentRef = 'N/A',
    gear = {},
    user = {},
  } = rental;

  // Date formatting helper
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
  };

  const formattedRentalDate = rentalDate !== 'N/A' ? formatDate(rentalDate) : 'N/A';
  const formattedRentalEndDate = rentalEnd !== 'N/A' ? formatDate(rentalEnd) : 'N/A';

  // Print the receipt
  const handlePrint = () => {
    window.print();
  };

  // Download receipt as PDF
  const handleDownloadPDF = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Rental Receipt', 20, 20);
    doc.text(`Rental ID: ${rentalIdValue}`, 20, 30);
    doc.text(`Gear ID: ${gear?.id || 'N/A'}`, 20, 40);
    doc.text(`Customer Name: ${user?.full_name || 'N/A'}`, 20, 50);
    doc.text(`Rental Date: ${formattedRentalDate}`, 20, 60);
    doc.text(`Rental Duration: ${rentalDuration} hour(s)`, 20, 70);
    doc.text(`Rental End: ${formattedRentalEndDate}`, 20, 80);
    doc.text(`Payment Ref: ${paymentRef}`, 20, 90);

    doc.save('rental-receipt.pdf');
  };

  // Share the receipt (Placeholder)
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Rental Receipt',
          text: `Receipt for rental ${rentalIdValue}`,
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this device or browser.');
    }
  };

  return (
    <div className="receipt-container">
      <div className="receipt-details">
        <div className="receipt-header">
          <img className="logo" src={logo} alt="Logo" />
          <h1 className="receipt-title">Rental Receipt</h1>
        </div>
        <div className="receipt-body">
          <div className="receipt-row">
            <span className="receipt-label">Rental ID:</span>
            <span className="receipt-value">{rentalIdValue}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Service:</span>
            <span className="receipt-value">{gear?.id || 'N/A'}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Customer Name:</span>
            <span className="receipt-value">{user?.full_name || 'N/A'}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Rental Date:</span>
            <span className="receipt-value">{formattedRentalDate}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Rental Duration:</span>
            <span className="receipt-value">
              {rentalDuration}
              {' '}
              hour(s)
            </span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Rental End:</span>
            <span className="receipt-value">{formattedRentalEndDate}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Payment Ref:</span>
            <span className="receipt-value">{paymentRef}</span>
          </div>
        </div>
      </div>
      <div className="receipt-actions">
        <button type="button" onClick={handlePrint}>
          Print Receipt
        </button>
        <button type="button" className="download-btn" onClick={handleDownloadPDF}>
          Download Receipt
        </button>
        <button type="button" className="share-btn" onClick={handleShare}>
          Share Receipt
        </button>
      </div>
    </div>
  );
};

// ✅ **PropTypes Validation**
Receipt.propTypes = {
  rental: PropTypes.shape({
    id: PropTypes.number,
    rental_datetime: PropTypes.string,
    rental_duration: PropTypes.number,
    rental_end_datetime: PropTypes.string,
    payment_ref_id: PropTypes.string,
    gear: PropTypes.shape({
      id: PropTypes.number,
    }),
    user: PropTypes.shape({
      full_name: PropTypes.string,
    }),
  }),
};

// ✅ **Default Props**
Receipt.defaultProps = {
  rental: null,
};

export default Receipt;
