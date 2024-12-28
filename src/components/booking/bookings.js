import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, cancelBooking, updateBooking } from '../../Redux/Reducers/bookingSlice';
import BookingEditForm from './BookingEditForm';
import './bookings.scss';

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.bookings);

  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({
    service: '',
    plan: '',
    duration: '',
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBookings());
    }
  }, [status, dispatch]);

  const handleEdit = (booking) => {
    setIsEditing(booking.id);
    setEditFormData({
      service: booking.service,
      plan: booking.plan,
      duration: booking.duration,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateBooking({ id: isEditing, ...editFormData }));
    setIsEditing(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelBooking(id));
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <h2>Bookings</h2>
      <table className="b_table">
        <thead>
          <tr>
            <th>Ref ID</th>
            <th>Service</th>
            <th>Plan</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (isEditing === booking.id ? (
              <BookingEditForm
                key={booking.id}
                editFormData={editFormData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            ) : (
              <tr key={booking.id}>
                <td>{booking.payment_ref_id || 'N/A'}</td>
                <td>{booking.service || 'N/A'}</td>
                <td>{booking.plan || 'N/A'}</td>
                <td>{booking.duration ? `${booking.duration} hour(s)` : 'N/A'}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(booking)} className="edit-button">
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancelBooking(booking.id)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )))
          ) : (
            <tr>
              <td colSpan="5">No bookings available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
