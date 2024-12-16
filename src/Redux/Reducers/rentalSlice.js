/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Thunks for async actions
export const fetchRentals = createAsyncThunk('rentals/fetchRentals', async () => {
  const response = await axios.get(`${API_BASE_URL}/rentals`);
  return response.data;
});

export const createRental = createAsyncThunk(
  'rentals/createRental',
  async (rentalData) => {
    const response = await axios.post(`${API_BASE_URL}/rentals`, rentalData);
    return response.data;
  },
);

export const cancelRental = createAsyncThunk('rentals/cancelRental', async (rentalId) => {
  const response = await axios.delete(`${API_BASE_URL}/rentals/${rentalId}`);
  return response.data;
});

const rentalsSlice = createSlice({
  name: 'rentals',
  initialState: {
    rentals: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rentals = action.payload;
      })
      .addCase(fetchRentals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createRental.fulfilled, (state, action) => {
        state.rentals.push(action.payload);
      })
      .addCase(cancelRental.fulfilled, (state, action) => {
        state.rentals = state.rentals.filter((rental) => rental.id !== action.payload);
      });
  },
});

export default rentalsSlice.reducer;
