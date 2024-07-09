import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { createBooking } from '../../services/api';
import BookingList from '../BookingsList';
import './booking_form.scss';
import PaymentButton from '../payment/PaymentButton';
import Receipt from '../Receipt/Receipt';

Modal.setAppElement('#root'); // Set the app element for accessibility

const BookingForm = () => {
  const [service, setService] = useState('');
  const [plan, setPlan] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [paymentRefId, setPaymentRefId] = useState('');
  const [booking, setBooking] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const plans = {
    basic: {
      price: 15000,
      session: 1,
      photos: 10,
      editing: 'Photos/Video Editing',
      files: 'Digital files',
    },
    regular: {
      price: 25000,
      session: 3,
      photos: 25,
      editing: 'Photos/Video Editing',
      files: 'Digital files',
    },
    premium: {
      price: 50000,
      session: 4,
      photos: 35,
      editing: 'Photos/Video Editing',
      files: 'Digital files',
    },
    platinum: {
      price: 200000,
      session: 24,
      photos: 50,
      editing: 'Photos/Video Editing',
      files: 'Digital files',
    },
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

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
      name,
      email,
      plan,
      phone,
      paymentRefId,
    };

    try {
      await createBooking(bookingData);
      setBooking(bookingData);
      setSuccess('Booking created successfully!');
      setModalIsOpen(true); // Open the modal after successful booking
    } catch (err) {
      setError('Failed to create booking.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    setPlan(selectedPlan);
    setDuration(plans[selectedPlan.toLowerCase()].session || '');
  };

  const handlePaymentSuccess = (reference) => {
    setIsPaymentConfirmed(true);
    setPaymentRefId(reference);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/pricing'); // Redirect to the pricing page after closing modal
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
                <option value="basic">Basic</option>
                <option value="regular">Regular</option>
                <option value="premium">Premium</option>
                <option value="platinum">Platinum</option>
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
            <label htmlFor="name">
              Name:
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
        {success && <p className="success">{success}</p>}
        {plan && plans[plan.toLowerCase()] && (
          <div className="plan-details">
            <h3>Selected Plan Details</h3>
            <p>
              Price:
              {plans[plan.toLowerCase()].price}
              {' '}
              Naira
            </p>
            <p>
              Session:
              {' '}
              {plans[plan.toLowerCase()].session}
              {' '}
              {plans[plan.toLowerCase()].session === 1 ? 'Hour' : 'Hours'}
            </p>
            <p>
              Photos:
              {plans[plan.toLowerCase()].photos}
              {' '}
              Edited Photos
            </p>
            <p>
              Editing:
              {plans[plan.toLowerCase()].editing}
            </p>
            <p>
              Files:
              {plans[plan.toLowerCase()].files}
            </p>
          </div>
        )}
        <div className="modal-container">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Booking Receipt"
            className="modal"
            overlayClassName="modal-overlay"
          >
            <div className="modal-content">
              <h2>Booking Receipt</h2>
              {booking && <Receipt booking={booking} />}
              <button type="button" onClick={closeModal}>
                Close
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <BookingList />

      {/* Modal for the receipt */}
    </div>
  );
};

export default BookingForm;
