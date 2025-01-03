import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf'; // Import jsPDF
import './ReceiptModal.scss'; // Import the SCSS file for styling

const ReceiptModal = () => {
  const { rentalId } = useParams(); // Get rentalId from URL
  const [rental, setRental] = useState(null);
  const { rentals } = useSelector((state) => state.rentals); // Get rentals from Redux store

  useEffect(() => {
    // Find the rental based on the rentalId
    const rentalDetails = rentals.find((rental) => rental.id === parseInt(rentalId, 10));

    if (rentalDetails) {
      // Assuming gear and user are separate, fetch them as needed
      const gearDetails = rentalDetails.gear || {};
      const userDetails = rentalDetails.user || {};

      setRental({
        ...rentalDetails,
        gear: gearDetails,
        user: userDetails,
      });
    }
  }, [rentalId, rentals]);

  if (!rental) {
    return <div>Rental details are unavailable. Please try again later.</div>;
  }

  const {
    id: rentalIdValue = 'N/A',
    rental_datetime: rentalDate = 'N/A',
    rental_duration: rentalDuration = 0,
    rental_end_datetime: rentalEnd = 'N/A',
    payment_ref_id: paymentRef = 'N/A',
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
    doc.text(`Gear ID: ${rental.gear?.id || 'N/A'}`, 20, 40);
    doc.text(`Customer Name: ${rental.user?.full_name || 'N/A'}`, 20, 50);
    doc.text(`Rental Date: ${formattedRentalDate}`, 20, 60);
    doc.text(`Rental Duration: ${rentalDuration} hour(s)`, 20, 70);
    doc.text(`Rental End: ${formattedRentalEndDate}`, 20, 80);
    doc.text(`Payment Ref: ${paymentRef}`, 20, 90);

    doc.save('rental-receipt.pdf');
  };

  // Share the receipt (Placeholder)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rental Receipt',
        text: `Receipt for rental ${rentalIdValue}`,
        url: window.location.href, // Shares the current URL
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this device or browser.');
    }
  };

  // Close modal
  const handleClose = () => {
    window.history.back(); // Or you can use a state to manage modal visibility
  };

  return (
    <div className="modal-overlay">
      <div className="receipt-modal">
        <button type="button" className="close-button" onClick={handleClose}>X</button>
        <div className="logo">
          {/* Optionally, add a logo */}
          <img src="/path/to/logo.png" alt="Logo" />
        </div>
        <h2>Rental Receipt</h2>
        <p>
          <strong>Rental ID:</strong>
          {' '}
          {rentalIdValue}
        </p>
        <p>
          <strong>Gear ID:</strong>
          {' '}
          {rental.gear?.id || 'N/A'}
        </p>
        <p>
          <strong>Customer Name:</strong>
          {' '}
          {rental.user?.full_name || 'N/A'}
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
        <p>
          <strong>Payment Ref:</strong>
          {' '}
          {paymentRef}
        </p>

        <div className="receipt-buttons">
          <button type="button" className="btn-print" onClick={handlePrint}>Print</button>
          <button type="button" className="btn-download" onClick={handleDownloadPDF}>Download PDF</button>
          <button type="button" className="btn-share" onClick={handleShare}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
