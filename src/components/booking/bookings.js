import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; // Modal import
import { fetchBookings, cancelBooking } from '../../Redux/Reducers/bookingSlice';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import BookingEditForm from './bokingEditForm';
import './bookings.scss';
import Receipt from '../Receipt/BookingReceipt'; // Assuming you have a Receipt component for rendering the receipt

const Bookings = (userRole) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { bookings, status, error } = useSelector((state) => state.bookings);
  const currentUser = useSelector((state) => state.auth.currentUser) || {};

  const canUpdateBooking = currentUser?.role === 'admin' || userRole === 'manager';
  const canCancelBooking = currentUser?.role === 'admin';

  const [isEditing, setIsEditing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Bookings
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBookings());
    }
    dispatch(fetchCurrentUser())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching current user:', error);
      });
  }, [status, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRowClick = (booking) => {
    // Open the modal and pass the selected booking data
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelBooking(id));
    }
  };

  const handleUpdateBooking = (booking) => {
    setIsEditing(true);
    setSelectedBooking(booking);
  };

  const handleCloseEditForm = () => {
    setIsEditing(false);
    setSelectedBooking(null);
  };

  // eslint-disable-next-line max-len
  const filteredBookings = bookings.filter((booking) => booking.payment_ref_id?.toLowerCase().includes(searchQuery.toLowerCase()));

  if (status === 'loading') return <div className="loading">Loading...</div>;
  if (status === 'failed') {
    return (
      <div className="error">
        Error:
        {error}
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <h2>Bookings</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Transaction ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {isEditing && selectedBooking && (
        <BookingEditForm booking={selectedBooking} onClose={handleCloseEditForm} />
      )}

      <table className="b_table">
        <thead>
          <tr>
            <th>Ref ID</th>
            <th>Service</th>
            <th>Plan</th>
            <th>Customer&apos;s Phone</th>
            <th>User&apos;s Full Name</th>
            <th>Customer&apos;s Email</th>
            <th>Booking Date</th>
            <th>Booking Duration</th>
            <th>Booking End Time</th>
            <th>Status/Edit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <tr
                key={booking.id}
                onClick={() => handleRowClick(booking)} // Trigger modal on row click
                style={{
                  cursor: booking?.service ? 'pointer' : 'not-allowed',
                  opacity: booking?.service ? 1 : 0.6,
                }}
              >
                <td>{booking.payment_ref_id || 'N/A'}</td>
                <td>{booking.service || 'N/A'}</td>
                <td>{booking.plan || 'N/A'}</td>
                <td>{currentUser ? booking.phone : 'N/A'}</td>
                <td>{currentUser?.full_name || 'N/A'}</td>
                <td>{currentUser?.email || 'N/A'}</td>
                <td>
                  {booking.date
                    ? new Date(booking.date).toLocaleString()
                    : 'N/A'}
                </td>
                <td>
                  {booking.duration ? `${booking.duration} hour(s)` : 'N/A'}
                </td>
                <td>
                  {booking.time
                    ? new Date(booking.time).toLocaleString()
                    : 'N/A'}
                </td>
                <td>
                  {canUpdateBooking && (
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateBooking(booking);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  {canCancelBooking && booking.status !== 'Cancelled' ? (
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelBooking(booking.id);
                      }}
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="cancelled">Cancelled</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No bookings available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Receipt */}
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="Receipt Modal">
        <h2>
          Receipt for Booking #
          {selectedBooking?.payment_ref_id}
        </h2>
        {selectedBooking && <Receipt booking={selectedBooking} />}
        <button type="button" onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Bookings;
