/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createGear = createAsyncThunk('gears/create', async (formData) => {
  const response = await axios.post('http://localhost:5000/api/v1/gears', { gear: formData });
  return response.data;
});

export const deleteGear = createAsyncThunk(
  'gears/deleteGear',
  async (gearId) => {
    const response = await axios.delete(`http://localhost:5000/api/v1/gears/${gearId}`);
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
      })
      .addCase(deleteGear.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteGear.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gears = state.gears.filter((gear) => gear.id !== action.payload.id);
      })
      .addCase(deleteGear.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default createGearSlice.reducer;
