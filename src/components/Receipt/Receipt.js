import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
// import jsPDF from 'jspdf';
import generatePDF from './generatePDF';
import './Receipt.scss';
import logo from '../images/png/Logo Silver.png';

const Receipt = ({ booking }) => {
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const handleDownload = () => {
    generatePDF(booking, logo);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Booking Receipt',
        text: 'Here is your booking receipt.',
        url: window.location.href,
      })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch((error) => {
          console.error('Error sharing', error);
        });
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="receipt-container">
      <div ref={receiptRef} className="receipt-details">
        <div className="receipt-header">
          <img className="logo" src={logo} alt="Logo" />
          <h1 className="receipt-title">Booking Receipt</h1>
        </div>
        <div className="receipt-body">
          <div className="receipt-row">
            <span className="receipt-label">Service:</span>
            <span className="receipt-value">{booking.service}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Date:</span>
            <span className="receipt-value">{booking.date}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Time:</span>
            <span className="receipt-value">{booking.time}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Duration:</span>
            <span className="receipt-value">
              {booking.duration}
              {' '}
              hours
            </span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Name:</span>
            <span className="receipt-value">{booking.name}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Email:</span>
            <span className="receipt-value">{booking.email}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Phone:</span>
            <span className="receipt-value">{booking.phone}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Plan:</span>
            <span className="receipt-value">{booking.plan}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Payment Ref ID:</span>
            <span className="receipt-value">{booking.paymentRefId}</span>
          </div>
        </div>
      </div>
      <div className="receipt-actions">
        <button type="button" onClick={handlePrint}>
          Print Receipt
        </button>
        <button
          type="button"
          className="download-btn"
          onClick={handleDownload}
        >
          Download Receipt
        </button>
        <button type="button" className="share-btn" onClick={handleShare}>
          Share Receipt
        </button>
      </div>
    </div>
  );
};

Receipt.propTypes = {
  booking: PropTypes.shape({
    service: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
    paymentRefId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Receipt;
