import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGears,
  rentGear,
  cancelRentGear,
  deleteGear,
} from '../../Redux/Reducers/gearSlice';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import './gearList.scss';
import PaymentButton from '../payment/PaymentButton';

const GearsList = () => {
  const [paymentRefId, setPaymentRefId] = useState(null);
  const dispatch = useDispatch();
  const {
    gears,
    status,
    rentStatus,
    deleteStatus,
    error,
  } = useSelector((state) => state.gears);

  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGears());
    }

    // Fetch current user data
    dispatch(fetchCurrentUser());
  }, [status, dispatch]);

  const handlePaymentSuccess = (reference, gearId) => {
    setPaymentRefId(paymentRefId.reference); // Set payment reference ID on success
    dispatch(rentGear({ gearId, paymentRefId: reference.reference }));
  };

  // const handleRent = (gearId) => {
  //   if (paymentRefId) {
  //     dispatch(rentGear({ gearId, paymentRefId }));
  //   } else {
  //     alert('Please confirm your payment before renting.');
  //   }
  // };

  const handleCancelRent = (gearId) => {
    dispatch(cancelRentGear(gearId)); // Cancel rent action
  };

  const handleDelete = (gearId) => {
    dispatch(deleteGear(gearId)); // Delete gear action
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div id="gearListContainer">
      <h2>Gears List</h2>
      <ul>
        {gears.map((gear) => (
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
                    Rented
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
                  <PaymentButton
                    amount={gear.pricePerHour}
                    email={currentUser.email}
                    value="Rent"
                    onSuccess={(reference) => handlePaymentSuccess(reference, gear.id)}
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete(gear.id)}
                  >
                    Delete
                  </button>

                </>
              )}
            </div>
            {rentStatus === 'loading' && <p>Renting gear...</p>}
            {rentStatus === 'succeeded' && <p>Gear rented successfully!</p>}
            {rentStatus === 'failed' && <p>Failed to rent gear.</p>}
            {deleteStatus === 'loading' && <p>Deleting gear...</p>}
            {deleteStatus === 'succeeded' && <p>Gear deleted successfully!</p>}
            {deleteStatus === 'failed' && <p>Failed to delete gear.</p>}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GearsList;
