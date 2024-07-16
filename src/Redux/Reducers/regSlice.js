/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/* eslint-disable camelcase */
export const signup = createAsyncThunk('user/signup', async ({ full_name, email, password }) => {
  const response = await axios.post('http://localhost:5000/signup', {
    user: { full_name, email, password },
  });
  return response.data;
});

const signupSlice = createSlice({
  name: 'user',
  initialState: {
    data: null, status: 'idle', error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default signupSlice.reducer;
