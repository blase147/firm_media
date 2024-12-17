import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentals } from '../../Redux/Reducers/rentalSlice';
import './rentals.scss'; // Import the CSS file

const getRentalStatus = (isRentedNow) => {
  if (isRentedNow === true) return 'Yes';
  if (isRentedNow === false) return 'No';
  return 'Unknown';
};

const Rentals = () => {
  const dispatch = useDispatch();
  const { rentals, status, error } = useSelector((state) => state.rentals);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRentals());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div className="loading">Loading...</div>;
  if (status === 'failed') {
    return (
      <div className="failed">
        Error:
        {' '}
        {error}
      </div>
    );
  }

  return (
    <div className="rentals-container">
      <h2>Rentals</h2>
      <ul>
        {Array.isArray(rentals)
          && rentals.map((rental) => (
            <li key={rental.id}>
              <h3>
                Rental ID:
                {rental.id}
              </h3>
              <p>
                <strong>Gear ID:</strong>
                {' '}
                <span>{rental.gear_id}</span>
              </p>
              <p>
                <strong>Rental Date:</strong>
                {' '}
                <span>{new Date(rental.rental_datetime).toLocaleString()}</span>
              </p>
              <p>
                <strong>Rental Duration:</strong>
                {' '}
                <span>
                  {rental.rental_duration}
                  {' '}
                  hour(s)
                </span>
              </p>
              <p>
                <strong>Rental End:</strong>
                {' '}
                <span>{new Date(rental.rental_end_datetime).toLocaleString()}</span>
              </p>
              <p>
                <strong>Payment Ref:</strong>
                <span>{getRentalStatus(rental.is_rented_now)}</span>
                <span>{rental.payment_ref_id}</span>
              </p>
              <p>
                <strong>Is Rented:</strong>
                {' '}
                <span>{getRentalStatus(rental.is_rented_now)}</span>
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Rentals;
