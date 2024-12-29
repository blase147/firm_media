/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Function to retrieve CSRF token from meta tag
const getCsrfToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token && token.getAttribute('content');
};

// Thunks for async actions

// Fetch all rentals
export const fetchRentals = createAsyncThunk('rentals/fetchRentals', async () => {
  const response = await axios.get(`${API_BASE_URL}/rentals`);
  return response.data;
});

export const fetchGears = createAsyncThunk('gears/fetchGears', async () => {
  // Make sure the URL is complete and points to the correct gears endpoint
  const response = await axios.get(`${API_BASE_URL}/gears`);
  if (!response.ok) {
    throw new Error('Failed to fetch gears');
  }
  return response.json();
});

// Create a rental
export const createRental = createAsyncThunk(
  'rentals/createRental',
  async (rentalData) => {
    const response = await axios.post(`${API_BASE_URL}/rentals`, rentalData);
    return response.data;
  },
);

// Update a rental
export const updateRental = createAsyncThunk(
  'rentals/updateRental',
  async ({ rentalId, updatedData }, { getState, rejectWithValue }) => {
    try {
      if (!rentalId) throw new Error('rentalId is missing');

      const { token } = getState().auth;
      const csrfToken = getCsrfToken();

      const response = await axios.put(
        `${API_BASE_URL}/rentals/${rentalId}`,
        updatedData,
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
      console.error('Update Rental Error:', error.message);
      return rejectWithValue(error.response?.data?.error || 'Failed to update rental');
    }
  },
);

// Cancel a rental
export const cancelRental = createAsyncThunk('rentals/cancelRental', async (rentalId) => {
  await axios.delete(`${API_BASE_URL}/rentals/${rentalId}`);
  return rentalId; // Returning rentalId to remove it from the state
});

// Slice
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
      // Fetch Rentals
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

      // Create Rental
      .addCase(createRental.fulfilled, (state, action) => {
        state.rentals.push(action.payload);
      })

      // Update Rental
      .addCase(updateRental.fulfilled, (state, action) => {
        const index = state.rentals.findIndex((rental) => rental.id === action.payload.id);
        if (index !== -1) {
          state.rentals[index] = action.payload;
        }
      })

      // Cancel Rental
      .addCase(cancelRental.fulfilled, (state, action) => {
        state.rentals = state.rentals.filter((rental) => rental.id !== action.payload);
      })

      .addCase(fetchGears.fulfilled, (state, action) => {
        state.gears = action.payload;
      });
  },
});

export default rentalsSlice.reducer;
