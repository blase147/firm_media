/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

export const fetchGears = createAsyncThunk('gears/fetchGears', async () => {
  const response = await axios.get(`${BASE_URL}/gears`);
  return response.data;
});

export const rentGear = createAsyncThunk(
  'gears/rentGear',
  async ({
    gearId, paymentRefId, rentalDuration, rentalDatetime,
  }) => {
    const response = await axios.post(`${BASE_URL}/gears/${gearId}/rent`, {
      payment_ref_id: paymentRefId,
      rental_datetime: rentalDatetime,
      rental_duration: rentalDuration,
    });
    return response.data;
  },
);

export const cancelRentGear = createAsyncThunk(
  'gears/cancelRentGear',
  async (gearId) => {
    const response = await axios.post(
      `${BASE_URL}/gears/${gearId}/cancel_rent`,
    );
    return response.data;
  },
);

export const deleteGear = createAsyncThunk(
  'gears/deleteGear',
  async (gearId) => {
    const response = await axios.delete(`${BASE_URL}/gears/${gearId}`);
    return response.data;
  },
);

export const createGear = createAsyncThunk(
  'gears/createGear',
  async (gearData) => {
    // Convert camelCase keys to snake_case keys
    const gearPayload = {
      name: gearData.name,
      gear_type: gearData.gearType,
      description: gearData.description,
      price_per_hour: gearData.pricePerHour,
      image_url: gearData.imageUrl,
    };

    const response = await axios.post(`${BASE_URL}/gears`, {
      gear: gearPayload,
    });
    return response.data;
  },
);

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
        const rentedGear = state.gears.find(
          (gear) => gear.id === action.payload.id,
        );
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
        const canceledGear = state.gears.find(
          (gear) => gear.id === action.payload.id,
        );
        if (canceledGear) {
          canceledGear.rented = false;
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
        state.gears = state.gears.filter(
          (gear) => gear.id !== action.payload.id,
        );
      })
      .addCase(deleteGear.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(createGear.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createGear.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gears.push(action.payload);
      })
      .addCase(createGear.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default gearSlice.reducer;
