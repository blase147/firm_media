// BookingForm.js

import React, { useState } from 'react';
import { createBooking } from '../../services/api';
import BookingList from '../BookingsList';
import './booking_form.scss'; // Import your SCSS file
import PaymentButton from '../payment/PaymentButton';

const BookingForm = () => {
  const [service, setService] = useState('');
  const [plan, setPlan] = useState(''); // State for Plan
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // State for Phone
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

    const bookingData = {
      service,
      date,
      time,
      duration,
      name,
      email,
      plan,
      phone,
    };

    try {
      await createBooking(bookingData);
      setSuccess('Booking created successfully!');
    } catch (err) {
      setError('Failed to create booking.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    setPlan(selectedPlan);
    setDuration(plans[selectedPlan].session || '');
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
                <option value="wedding">Wedding</option>
                <option value="portrait">Portrait</option>
                <option value="corporate">Corporate</option>
                <option value="event">Event</option>
                <option value="other">Other</option>
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
                placeholder="Start Date"
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
                placeholder="Start Time"
                required
              />
            </label>
          </div>
          {/* Duration can be hidden or shown based on your UI/UX design */}
          {/* Ensure the value is passed to PaymentButton for amount calculation */}
          <input
            type="hidden"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <div>
            <label htmlFor="name">
              Name:
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
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
                placeholder="Email"
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
                placeholder="Phone number"
                required
              />
            </label>
          </div>
          {/* Pass amount and email to PaymentButton */}
          <PaymentButton amount={plans[plan]?.price * 100} email={email} />
          <button type="submit" disabled={loading}>
            Submit Booking
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        {plan && plans[plan] && (
          <div className="plan-details">
            <h3>Selected Plan Details</h3>
            <p>
              Price:
              {plans[plan].price}
              {' '}
              Naira
            </p>
            <p>
              Session:
              {plans[plan].session}
              {' '}
              hour(s)
            </p>
            <p>
              Photos:
              {plans[plan].photos}
            </p>
            <p>
              Editing:
              {plans[plan].editing}
            </p>
            <p>
              Files:
              {plans[plan].files}
            </p>
          </div>
        )}

        <div>
          <h3>Booked Schedule</h3>
          <BookingList />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
