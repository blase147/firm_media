/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Helper function to set headers with token
const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

// Function to retrieve CSRF token from meta tag
const getCsrfToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token && token.getAttribute('content');
};

// Fetch all bookings
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_BASE_URL}/bookings`, {
        headers: getAuthHeaders(token),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch bookings');
    }
  },
);

// Create a new booking
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const csrfToken = getCsrfToken();

      const response = await axios.post(
        `${API_BASE_URL}/bookings`,
        { booking: formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create booking');
    }
  },
);

// Cancel a booking
export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`, {
        headers: getAuthHeaders(token),
      });

      return { id: bookingId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to cancel booking');
    }
  },
);

// Update a booking
export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ bookingId, updatedData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const csrfToken = getCsrfToken();

      const response = await axios.put(
        `${API_BASE_URL}/bookings/${bookingId}`,
        { booking: updatedData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update booking');
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
        state.bookings = action.payload;
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
      })

      // Update booking
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id,
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default bookingsSlice.reducer;
