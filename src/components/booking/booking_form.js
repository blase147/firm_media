import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Bookings from './bookings';
import { createBooking } from '../../Redux/Reducers/bookingSlice';
import './booking_form.scss'; // Import your SCSS file
import PaymentButton from '../payment/PaymentButton';
import Receipt from '../Receipt/Receipt';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';

Modal.setAppElement('#root'); // Accessibility requirement for Modal

const BookingForm = () => {
  const [service, setService] = useState('');
  const [plan, setPlan] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [booking, setBooking] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const plans = {
    Basic: {
      price: 15000, session: 1, photos: 10, editing: 'Photos/Video Editing', files: 'Digital files',
    },
    Regular: {
      price: 25000, session: 3, photos: 25, editing: 'Photos/Video Editing', files: 'Digital files',
    },
    Premium: {
      price: 50000, session: 4, photos: 35, editing: 'Photos/Video Editing', files: 'Digital files',
    },
    Platinum: {
      price: 200000, session: 24, photos: 50, editing: 'Photos/Video Editing', files: 'Digital files',
    },
  };

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [currentUser, dispatch]);

  const handlePaymentAndBooking = async (paymentRefId) => {
    console.log('Payment Reference ID inside handlePaymentAndBooking:', paymentRefId); // Log to confirm
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    setBooking(null); // Clear any previous booking data

    if (!paymentRefId) {
      setError('Payment failed. No reference ID received.');
      setLoading(false);
      return;
    }

    const bookingData = {
      service,
      date,
      time,
      duration,
      email,
      plan,
      phone,
      paymentRefId, // Make sure this is passed correctly
    };

    try {
      const response = await dispatch(createBooking(bookingData)).unwrap();

      console.log('Booking response:', response); // Debugging the response

      if (response && response.success) {
        setSuccessMessage('Booking created successfully!');
        setBooking(response.data); // Set booking only after success
        setModalIsOpen(true); // Open modal with booking data
      } else {
        throw new Error(response?.error || 'Failed to create booking');
      }
    } catch (err) {
      console.error('API Error:', err.message || err);
      setError(err.message || 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const processPayment = (reference) => {
    console.log('Payment reference received: ', reference); // Log to confirm
    handlePaymentAndBooking(reference);
  };

  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    setPlan(selectedPlan);
    setDuration(plans[selectedPlan]?.session || '');
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/pricing');
  };

  return (
    <div id="booking_form_container">
      <div className="booking-form">
        <h2>Book a Service</h2>
        <form>
          <div>
            <label htmlFor="service">
              Service:
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
              >
                <option value="">Select a service</option>
                <option value="Wedding">Wedding</option>
                <option value="Portrait">Portrait</option>
                <option value="Corporate">Corporate</option>
                <option value="Event">Event</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="plan">
              Plan:
              <select
                id="plan"
                value={plan}
                onChange={handlePlanChange}
                required
              >
                <option value="">Select a Plan</option>
                <option value="Basic">Basic</option>
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="Platinum">Platinum</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="date">
              Start Date:
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="time">
              Start Time:
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="duration">
              Duration (hours):
              <input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email:
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="phone">
              Phone:
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
          </div>
          {/* Payment button, make sure this triggers payment process */}
          <PaymentButton
            amount={plans[plan]?.price * 100}
            email={email}
            onSuccess={processPayment} // Pass reference here
          />
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
      <Bookings />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Receipt Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Booking Receipt</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {booking && <Receipt booking={booking} />}
        <button type="button" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default BookingForm;
