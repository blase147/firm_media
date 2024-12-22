import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchGears, deleteGear, rentGear, cancelRentGear,
} from '../../Redux/Reducers/gearSlice';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import './gearList.scss';
import RentButton from '../payment/RentingButton';
import Receipt from './receipt';

Modal.setAppElement('#root'); // Accessibility requirement

const GearsList = () => {
  const dispatch = useDispatch();
  const { gears, status, error: gearsError } = useSelector((state) => state.gears);
  const { currentUser } = useSelector((state) => state.auth);

  const [hours, setHours] = useState(1);
  const [dateTime, setDateTime] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedGear, setSelectedGear] = useState(null);
  const [paymentReference, setPaymentReference] = useState('');

  // Fetch gears and current user on mount
  useEffect(() => {
    if (status === 'idle') dispatch(fetchGears());
    dispatch(fetchCurrentUser());
  }, [status, dispatch]);

  const handlePaymentSuccess = async (reference, gearId) => {
    try {
      const resultAction = await dispatch(
        rentGear({
          gearId,
          paymentRefId: reference.reference,
          rentalDuration: hours,
          rentalDatetime: dateTime.toISOString(),
        }),
      );

      if (rentGear.fulfilled.match(resultAction)) {
        setSuccessMessage(`Successfully rented gear: ${gearId}`);
        setPaymentReference(reference.reference);

        // Log the resultAction payload
        console.log('Rental Data from resultAction: ', resultAction.payload);

        const rentalData = {
          ...gears.find((gear) => gear.id === gearId),
          rentalId: resultAction.payload.rentalId || resultAction.payload.id,
          customerName: currentUser.name,
          rentalEndDatetime: new Date(new Date(dateTime).getTime() + hours * 60 * 60 * 1000),
        };
        console.log('Final Rental Data: ', rentalData); // Log the final rental data

        setSelectedGear(rentalData);
        setModalIsOpen(true);
      } else {
        console.error('Failed to create rental:', resultAction.error);
      }
    } catch (error) {
      console.error('Error creating rental:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedGear(null);
    setPaymentReference(''); // Reset payment reference on close
  };

  const handleDateTimeChange = (event) => {
    setDateTime(new Date(event.target.value));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>{gearsError}</div>;

  return (
    <div id="gearListContainer">
      <h2>Gears List</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <ul>
        {Array.isArray(gears) && gears.map((gear) => {
          const rentalEndDateTime = gear.rental_end_datetime
            ? new Date(gear.rental_end_datetime)
            : null;

          return (
            <div className="equipment_card" key={gear.id}>
              <div className="equipment_img">
                <img
                  src={gear.imageUrl}
                  alt={gear.gearType}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
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
                      onClick={() => dispatch(cancelRentGear(gear.id))}
                    >
                      Cancel Rent
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch(deleteGear(gear.id))}
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
                        min="1"
                        onChange={(e) => setHours(parseInt(e.target.value, 10) || 1)}
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
                        onProceedToPayment={() => Promise.resolve(true)}
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Receipt Modal"
        className="modal2"
        overlayClassName="modal2-overlay"
      >
        <h2>Your Rented Gear Receipt</h2>
        {selectedGear ? (
          <Receipt
            gear={selectedGear}
            paymentReference={paymentReference}
          />
        ) : (
          <p>No rental found with the given ID.</p> // Add this fallback if selectedGear is null
        )}
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default GearsList;
