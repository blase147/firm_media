import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGears, deleteGear, rentGear, cancelRentGear,
} from '../../Redux/Reducers/gearSlice';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import './gearList.scss';
import RentButton from '../payment/RentingButton'; // Ensure this import is correct

const GearsList = () => {
  const dispatch = useDispatch();
  const { gears, status, error: gearsError } = useSelector((state) => state.gears);
  const { currentUser } = useSelector((state) => state.auth);

  const [hours, setHours] = useState(1);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGears());
    }
    dispatch(fetchCurrentUser());
  }, [status, dispatch]);

  const handleCheckAvailability = async (gearId, selectedDateTime, selectedHours) => {
    try {
      const token = localStorage.getItem('token'); // Match the key used in authSlice
      console.log('Retrieved token:', token); // Debug line
      if (!token) {
        console.error('No authentication token found');
        return false;
      }

      console.log('Making API call to check availability');
      const response = await fetch(`http://localhost:5000/api/v1/gears/${gearId}/check_availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rental_datetime: selectedDateTime.toISOString(),
          rental_duration: selectedHours,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('API Error:', error);
        throw new Error('Failed to check availability');
      }

      const data = await response.json();
      console.log('API Response:', data);
      return data.available;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  };

  const handleProceedToPayment = async (gearId) => {
    const selectedDateTime = dateTime;
    const selectedHours = hours;

    console.log('Checking availability for gear:', gearId);
    console.log('Selected DateTime:', selectedDateTime);
    console.log('Selected Hours:', selectedHours);

    const isAvailable = await handleCheckAvailability(
      gearId,
      selectedDateTime,
      selectedHours,
    );

    console.log('Availability:', isAvailable);
    return isAvailable;
  };

  const handlePaymentSuccess = async (reference, gearId) => {
    const selectedDateTime = dateTime;
    const selectedHours = hours;

    console.log('Payment successful with reference:', reference);

    try {
      const resultAction = await dispatch(
        rentGear({
          gearId,
          paymentRefId: reference.reference,
          rentalDuration: selectedHours,
          rentalDatetime: selectedDateTime.toISOString(),
        }),
      );

      if (rentGear.fulfilled.match(resultAction)) {
        console.log('Rental created:', resultAction.payload);
      } else {
        console.error('Failed to create rental:', resultAction.error);
      }
    } catch (error) {
      console.error('Error creating rental:', error);
    }
  };

  const handleCancelRent = (gearId) => {
    dispatch(cancelRentGear(gearId));
  };

  const handleDelete = (gearId) => {
    dispatch(deleteGear(gearId));
  };

  const handleDateTimeChange = (event) => {
    setDateTime(new Date(event.target.value));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{gearsError}</div>;
  }

  return (
    <div id="gearListContainer">
      <h2>Gears List</h2>
      <ul>
        {Array.isArray(gears) && gears.map((gear) => {
          const rentalEndDateTime = gear.rental_end_datetime
            ? new Date(gear.rental_end_datetime)
            : null;

          return (
            <div className="equipment_card" key={gear.id}>
              <img
                src={gear.imageUrl}
                alt={gear.gearType}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              <div className="equipment_price_per_hour">
                <h3>{gear.gearType}</h3>
                <h4>
                  <span className="currency">N</span>
                  {gear.pricePerHour}
                  <span>/hour</span>
                </h4>
              </div>
              <div className="equipment_description">
                <ul>
                  <li>{gear.description}</li>
                </ul>
              </div>
              <div className="rent">
                {gear.is_rented_now ? (
                  <>
                    <button
                      type="button"
                      style={{ backgroundColor: 'green' }}
                      disabled
                    >
                      Rented until
                      {' '}
                      {rentalEndDateTime ? rentalEndDateTime.toLocaleString() : 'N/A'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancelRent(gear.id)}
                    >
                      Cancel Rent
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(gear.id)}
                    >
                      Delete Gear
                    </button>
                  </>
                ) : (
                  <>
                    <label htmlFor={`duration-${gear.id}`}>
                      Rental Duration (hours):
                      <input
                        id={`duration-${gear.id}`}
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(parseInt(e.target.value, 10))}
                      />
                    </label>
                    <label htmlFor={`datetime-${gear.id}`}>
                      Rental Date & Time:
                      <input
                        id={`datetime-${gear.id}`}
                        type="datetime-local"
                        value={dateTime.toISOString().slice(0, 16)}
                        onChange={handleDateTimeChange}
                      />
                    </label>
                    {currentUser ? (
                      <RentButton
                        amount={gear.pricePerHour * hours * 100} // Amount in kobo
                        email={currentUser.email}
                        onProceedToPayment={() => handleProceedToPayment(gear.id)}
                        onSuccess={(transaction) => handlePaymentSuccess(transaction, gear.id)}
                      />

                    ) : (
                      <p>Please log in to rent this gear.</p>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default GearsList;
