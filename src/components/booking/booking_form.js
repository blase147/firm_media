import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { createBooking } from '../../services/api';
import Bookings from './bookings';
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
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [paymentRefId, setPaymentRefId] = useState('');
  const [booking, setBooking] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

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

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    if (!isPaymentConfirmed) {
      setError('Please confirm your payment before submitting the form.');
      setLoading(false);
      return;
    }

    const bookingData = {
      service,
      date,
      time,
      duration,
      email,
      currentUser,
      plan,
      phone,
      paymentRefId,
    };

    try {
      await createBooking(bookingData);
      setBooking(bookingData);
      setSuccessMessage('Booking created successfully!');
      setModalIsOpen(true);
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    setPlan(selectedPlan);
    setDuration(plans[selectedPlan]?.session || '');
  };

  const handlePaymentSuccess = (reference) => {
    setIsPaymentConfirmed(true);
    setPaymentRefId(reference);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/pricing');
  };

  return (
    <div id="booking_form_container">
      <div className="booking-form">
        <h2>Book a Service</h2>
        <form onSubmit={handleBooking}>
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
          <PaymentButton
            amount={plans[plan]?.price * 100}
            email={email}
            onSuccess={handlePaymentSuccess}
          />
          <button type="submit" disabled={loading}>
            Submit Booking
          </button>
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
