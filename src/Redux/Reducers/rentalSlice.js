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

export const updateRental = createAsyncThunk(
  'rentals/updateRental',
  async (rentalData) => {
    const response = await axios.put(`${API_BASE_URL}/rentals/${rentalData.id}`, rentalData);
    return response.data; // Assuming the API returns the updated rental data
  },
);

export const cancelRental = createAsyncThunk('rentals/cancelRental', async (rentalId) => {
  await axios.delete(`${API_BASE_URL}/rentals/${rentalId}`); // No need to store the response here
  return rentalId; // Returning rentalId to remove it from the state
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
      .addCase(updateRental.fulfilled, (state, action) => {
        const index = state.rentals.findIndex((rental) => rental.id === action.payload.id);
        if (index !== -1) {
          state.rentals[index] = action.payload;
        }
      })
      .addCase(cancelRental.fulfilled, (state, action) => {
        state.rentals = state.rentals.filter((rental) => rental.id !== action.payload);
      });
  },
});

export default rentalsSlice.reducer;
