import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import {
  fetchGears, rentGear, deleteGear,
} from '../../Redux/Reducers/gearSlice';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import './gearList.scss';
import RentButton from '../payment/RentingButton';
import Receipt from '../Receipt/RentingReceipt'; // Assuming you have a Receipt component for rendering the receipt
// import Receipt from './receipt';
import GearEditForm from './gearEditForm';

Modal.setAppElement('#root'); // Accessibility requirement

const GearsList = () => {
  const dispatch = useDispatch();
  const { gears, status, error: gearsError } = useSelector((state) => state.gears);
  const currentUser = useSelector((state) => state.auth.currentUser) || {};

  const [rentalDetails, setRentalDetails] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedGear, setSelectedGear] = useState(null);
  const [paymentReference, setPaymentReference] = useState('');

  // Inside GearsList component function
  const [editGearId, setEditGearId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (gearId) => {
    setEditGearId(gearId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditGearId(null);
  };

  // Fetch gears and current user on mount
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGears());
    }

    dispatch(fetchCurrentUser())
      .then(() => {
        setLoading(false); // Set loading to false after user data is fetched
        console.log('Current User fetched:', currentUser); // Check if currentUser is being fetched correctly
        console.log('User Role:', currentUser?.role); // Log the role value
      })
      .catch((error) => {
        setLoading(false); // Stop loading even if there's an error
        console.error('Error fetching current user:', error);
      });
  }, [status, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching user data
  }

  const canUpdateGear = currentUser?.role === 'admin'; // Check if the role is 'admin'
  const canDeleteGear = currentUser?.role === 'admin'; // Check if the role is 'admin'

  console.log('Can update gear:', canUpdateGear); // Logs if the user can update gear
  console.log('Can delete gear:', canDeleteGear); // Logs if the user can delete gear

  // Handle payment success
  const handlePaymentSuccess = async (transaction, gearId) => {
    try {
      const { rentalDuration = 1, rentalDatetime } = rentalDetails[gearId] || {};
      const resultAction = await dispatch(
        rentGear({
          gearId,
          paymentRefId: transaction.reference,
          rentalDuration,
          rentalDatetime,
        }),
      );

      if (rentGear.fulfilled.match(resultAction)) {
        setSuccessMessage(
          `Successfully rented gear: ${gearId} for ${rentalDuration} hours starting at ${rentalDatetime}`,
        );
        setPaymentReference(transaction.reference);

        const rentalData = {
          ...gears.find((gear) => gear.id === gearId),
          rentalId: resultAction.payload.rentalId || resultAction.payload.id,
          customerName: currentUser?.name || 'Unknown Customer',
          rentalEndDatetime: new Date(new Date(rentalDatetime).getTime()
          + rentalDuration * 60 * 60 * 1000),
        };

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
    setPaymentReference('');
  };

  const handleDateTimeChange = (event, gearId) => {
    setRentalDetails((prevDetails) => ({
      ...prevDetails,
      [gearId]: { ...prevDetails[gearId], rentalDatetime: new Date(event.target.value) },
    }));
  };

  const handleDurationChange = (event, gearId) => {
    const value = parseInt(event.target.value, 10);

    setRentalDetails((prevDetails) => ({
      ...prevDetails,
      [gearId]: {
        ...prevDetails[gearId],
        // eslint-disable-next-line no-restricted-globals
        rentalDuration: !isNaN(value) && value > 0 ? value : 1, // Ensure valid positive integer
      },
    }));
  };

  // Delete Gear Logic
  const handleGearDelete = (gearId) => {
    if (window.confirm('Are you sure you want to delete this gear?')) {
      dispatch(deleteGear(gearId))
        .then(() => {
          setSuccessMessage(`Gear with ID ${gearId} deleted successfully.`);
          dispatch(fetchGears()); // Refetch gears after deletion
        })
        .catch((error) => {
          console.error('Failed to delete gear:', error);
          console.log(currentUser?.role); // Check if 'admin' is properly set
        });
    }
  };

  // Loading state handling
  if (status === 'loading') {
    return <div>Loading gears...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {' '}
        {gearsError}
      </div>
    );
  }

  return (
    <div id="gearListContainer">
      <h2>Gears List</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <ul>
        {Array.isArray(gears)
          && gears.map((gear) => (
            <div className="equipment_card" key={gear.id}>
              <div className="equipment_img">
                <img
                  src={gear.imageUrl || 'https://via.placeholder.com/150'}
                  alt={gear.gearType || 'Gear Image'}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
              <div className="equipment_price_per_hour">
                <h3>{gear.gearType || 'Unknown Gear'}</h3>
                <h4>
                  <span className="currency">N</span>
                  {gear.pricePerHour || '0'}
                  <span>/hour</span>
                </h4>
              </div>
              <div className="equipment_description">
                <ul>
                  <li>{gear.description || 'No description available'}</li>
                </ul>
              </div>
              <div className="rent">
                <label htmlFor={`duration-${gear.id}`}>
                  Rental Duration (hours):
                  <input
                    id={`duration-${gear.id}`}
                    type="number"
                    value={rentalDetails[gear.id]?.rentalDuration || 1}
                    min="1"
                    onChange={(e) => handleDurationChange(e, gear.id)}
                  />
                </label>

                <label htmlFor={`datetime-${gear.id}`}>
                  Rental Date & Time:
                  <input
                    id={`datetime-${gear.id}`}
                    className="date"
                    type="datetime-local"
                    value={rentalDetails[gear.id]?.rentalDatetime?.toISOString().slice(0, 16) || ''}
                    onChange={(e) => handleDateTimeChange(e, gear.id)}
                  />
                </label>
                <div>
                  {currentUser?.email ? (
                    <>
                      <RentButton
                        amount={gear.pricePerHour
                          * (rentalDetails[gear.id]?.rentalDuration || 1) * 100}
                        email={currentUser.email}
                        onProceedToPayment={() => Promise.resolve(true)}
                        onSuccess={(transaction) => handlePaymentSuccess(transaction, gear.id)}
                      />
                      {canUpdateGear && (
                      <button
                        type="button"
                        className="update-btn"
                        onClick={() => openEditModal(gear.id)}
                      >
                        Update
                      </button>
                      )}
                      {canDeleteGear && (
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleGearDelete(gear.id)}
                      >
                        Delete Gear
                      </button>
                      )}
                    </>
                  ) : (
                    <p>Please log in to rent this gear.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Receipt Modal"
        className="modal2"
        overlayClassName="modal2-overlay"
      >
        <h2>MotionBlox</h2>
        {selectedGear ? (
          <Receipt
            gear={selectedGear}
            paymentReference={paymentReference}
            rentalDateTime={rentalDetails[selectedGear.id]?.rentalDatetime}
            rentalDuration={rentalDetails[selectedGear.id]?.rentalDuration}
          />
        ) : (
          <p>No rental found with the given ID.</p>
        )}
        <button className="close-btn" type="button" onClick={closeModal}>
          Close
        </button>
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Gear Modal"
        className="modal2"
        overlayClassName="modal2-overlay"
      >
        {editGearId && (
          <GearEditForm gearId={editGearId} closeModal={closeEditModal} />
        )}
      </Modal>
    </div>
  );
};

export default GearsList;
