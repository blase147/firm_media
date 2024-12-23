/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Thunks for async actions
export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const response = await axios.get(`${API_BASE_URL}/bokkings`);
  return response.data;
});

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bokkingData) => {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bokkingData);
    return response.data;
  },
);

export const cancelBooking = createAsyncThunk('bookings/cancelBooking', async (bookingId) => {
  const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
  return response.data;
});

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
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((rental) => rental.id !== action.payload);
      });
  },
});

export default bookingsSlice.reducer;
