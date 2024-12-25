/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Helper function to set headers with token
const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

// Thunks for async actions

// Fetch all bookings
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth; // Retrieve token from auth slice
      const response = await axios.get(`${API_BASE_URL}/bookings`, {
        headers: getAuthHeaders(token),
      });
      return response.data; // Return entire response to access 'data'
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch bookings');
    }
  },
);

// Function to retrieve CSRF token from meta tag
const getCsrfToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token && token.getAttribute('content');
};

// Create a new booking
export const createBooking = createAsyncThunk('bookings/create', async (formData, { getState }) => {
  const { token } = getState().auth; // Assuming the token is in the auth slice
  const csrfToken = getCsrfToken();

  const response = await axios.post('http://localhost:5000/api/v1/bookings', { booking: formData }, {
    headers: {
      Authorization: `Bearer ${token}`, // Make sure token is added here
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
  });

  return response.data;
});

// Cancel a booking
export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth; // Retrieve token from auth slice
      const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`, {
        headers: getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to cancel booking');
    }
  },
);

// Slice definition
const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch bookings
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload.data; // Use 'data' from the response
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create booking
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Cancel booking
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload.id,
        );
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default bookingsSlice.reducer;
