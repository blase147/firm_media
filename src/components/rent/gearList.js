import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGears, rentGear, cancelRentGear, deleteGear,
} from '../../Redux/Reducers/gearSlice';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import './gearList.scss';
import RentButton from '../payment/RentingButton';

// Function to calculate end date and time
const calculateEndDateTime = (rentalDateTime, rentalDuration) => {
  if (!rentalDateTime || !rentalDuration) return null;

  // Add duration (in hours) to rental datetime
  const endDateTime = new Date(rentalDateTime);
  endDateTime.setHours(endDateTime.getHours() + rentalDuration);

  return endDateTime;
};

// Function to format end date and time
const formatEndDateTime = (endDateTime) => {
  if (!endDateTime) {
    return 'Invalid Date';
  }
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC', // Ensure the time is displayed in UTC
  };
  return endDateTime.toLocaleString('en-GB', options).replace(',', ' by');
};

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
      const response = await fetch(`http://localhost:5000/api/v1/gears/${gearId}/check_availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rental_datetime: selectedDateTime.toISOString(),
          rental_duration: selectedHours,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to check availability');
      }

      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleProceedToPayment = async (gearId) => {
    const selectedDateTime = dateTime;
    const selectedHours = hours;
    const isAvailable = await handleCheckAvailability(
      gearId,
      selectedDateTime,
      selectedHours,
    );
    return isAvailable;
  };

  const handlePaymentSuccess = async (reference, gearId) => {
    const selectedDateTime = dateTime;
    const selectedHours = hours;

    console.log('Payment successful with reference:', reference);
    dispatch(
      rentGear({
        gearId,
        paymentRefId: reference.reference,
        rentalDuration: selectedHours,
        rentalDatetime: selectedDateTime.toISOString(),
      }),
    );
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
        {gears.map((gear) => {
          // Calculate and format rental end date time
          const rentalEndDateTime = calculateEndDateTime(
            new Date(gear.rental_datetime), gear.rental_duration,
          );
          const formattedEndDateTime = formatEndDateTime(rentalEndDateTime);

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
                {gear.rented ? (
                  <>
                    <button
                      type="button"
                      style={{ backgroundColor: 'green' }}
                      disabled
                    >
                      Rented until
                      {' '}
                      {formattedEndDateTime || 'N/A'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancelRent(gear.id)}
                    >
                      Cancel Rent
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
                      <p>Please log in to proceed with the rental.</p>
                    )}
                  </>
                )}
              </div>
              <div className="delete_gear">
                <button
                  type="button"
                  onClick={() => handleDelete(gear.id)}
                >
                  Delete Gear
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default GearsList;
