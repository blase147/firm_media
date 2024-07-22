/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createGear = createAsyncThunk('gears/create', async (formData) => {
  const response = await axios.post('http://localhost:5000/api/v1/gears', { gear: formData });
  return response.data;
});

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
