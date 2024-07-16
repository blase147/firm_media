/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch gears
export const fetchGears = createAsyncThunk('gears/fetchGears', async () => {
  const response = await axios.get('http://localhost:5000/api/v1/gears');
  return response.data;
});

// Async thunk to rent a gear
export const rentGear = createAsyncThunk('gears/rentGear', async (gearId) => {
  const response = await axios.post(`http://localhost:5000/api/v1/gears/${gearId}/rent`);
  return { gearId, data: response.data };
});

// Async thunk to cancel renting a gear
export const cancelRentGear = createAsyncThunk('gears/cancelRentGear', async (gearId) => {
  const response = await axios.post(`http://localhost:5000/api/v1/gears/${gearId}/cancel_rent`);
  return { gearId, data: response.data };
});

// Async thunk to delete a gear
export const deleteGear = createAsyncThunk('gears/deleteGear', async (gearId) => {
  await axios.delete(`http://localhost:5000/api/v1/gears/${gearId}`);
  return gearId;
});

const gearSlice = createSlice({
  name: 'gears',
  initialState: {
    gears: [],
    status: 'idle',
    rentStatus: 'idle',
    deleteStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGears.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGears.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gears = action.payload;
      })
      .addCase(fetchGears.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(rentGear.pending, (state) => {
        state.rentStatus = 'loading';
      })
      .addCase(rentGear.fulfilled, (state, action) => {
        state.rentStatus = 'succeeded';
        const rentedGear = state.gears.find((gear) => gear.id === action.payload.gearId);
        if (rentedGear) {
          rentedGear.rented = true;
        }
      })
      .addCase(rentGear.rejected, (state, action) => {
        state.rentStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(cancelRentGear.pending, (state) => {
        state.rentStatus = 'loading';
      })
      .addCase(cancelRentGear.fulfilled, (state, action) => {
        state.rentStatus = 'succeeded';
        const rentedGear = state.gears.find((gear) => gear.id === action.payload.gearId);
        if (rentedGear) {
          rentedGear.rented = false;
        }
      })
      .addCase(cancelRentGear.rejected, (state, action) => {
        state.rentStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteGear.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteGear.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.gears = state.gears.filter((gear) => gear.id !== action.payload);
      })
      .addCase(deleteGear.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default gearSlice.reducer;
