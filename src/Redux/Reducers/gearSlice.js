/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

// Fetch all gears
export const fetchGears = createAsyncThunk('gears/fetchGears', async () => {
  const response = await axios.get(`${BASE_URL}/gears`);
  return response.data;
});

// Rent a gear
export const rentGear = createAsyncThunk(
  'gears/rentGear',
  async ({
    gearId, paymentRefId, rentalDuration, rentalDatetime,
  }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      if (!gearId || !paymentRefId || !rentalDuration || !rentalDatetime) {
        throw new Error('All fields (gearId, paymentRefId, rentalDuration, rentalDatetime) are required');
      }

      const response = await axios.post(
        `${BASE_URL}/gears/${gearId}/rent`,
        {
          rental: {
            payment_ref_id: paymentRefId,
            rental_datetime: rentalDatetime,
            rental_duration: rentalDuration,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  },
);

// Cancel rent
export const cancelRentGear = createAsyncThunk(
  'gears/cancelRentGear',
  async (gearId) => {
    const response = await axios.post(`${BASE_URL}/gears/${gearId}/cancel_rent`);
    return response.data;
  },
);

// Delete a gear
export const deleteGear = createAsyncThunk(
  'gears/deleteGear',
  async (gearId) => {
    const response = await axios.delete(`${BASE_URL}/gears/${gearId}`);
    return response.data;
  },
);

// Update a gear
export const updateGear = createAsyncThunk(
  'gears/updateGear',
  async ({ gearId, gearData }) => {
    const response = await axios.put(`${BASE_URL}/gears/${gearId}`, {
      gear: gearData,
    });
    return response.data;
  },
);

// Create a gear
export const createGear = createAsyncThunk(
  'gears/createGear',
  async (gearData) => {
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

// Gear Slice
const gearSlice = createSlice({
  name: 'gears',
  initialState: {
    gears: [],
    status: 'idle',
    rentStatus: 'idle',
    deleteStatus: 'idle',
    updateStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Gears
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

      // Rent Gear
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
        state.error = action.payload || action.error.message;
      })

      // Cancel Rent
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
      });
  },
});

export default gearSlice.reducer;
