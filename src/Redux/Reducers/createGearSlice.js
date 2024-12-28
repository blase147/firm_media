/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createGear = createAsyncThunk('gears/create', async (formData, { getState }) => {
  // Retrieve the authentication token from the Redux store or localStorage/sessionStorage
  const { token } = getState().auth; // Assuming you store the token in auth slice

  const response = await axios.post('http://localhost:5000/api/v1/gears', { gear: formData }, {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in Authorization header
    },
  });

  return response.data;
});

export const rentGearUpdate = createAsyncThunk(
  'gears/rentGearUpdate',
  async ({ rentalId, rentalData }, { getState }) => {
    const { token } = getState().auth; // Ensure token is being retrieved properly

    const response = await axios.put(
      `${'http://localhost:5000/api/v1/gears'}/rentals/${rentalId}`,
      { rental: rentalData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
);

const createGearSlice = createSlice({
  name: 'gears',
  initialState: {
    gears: [],
    isLoading: false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGear.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGear.fulfilled, (state, action) => {
        state.gears.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createGear.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default createGearSlice.reducer;
