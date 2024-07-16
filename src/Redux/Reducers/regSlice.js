/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/* eslint-disable camelcase */
export const signup = createAsyncThunk('user/signup', async ({
  full_name, email, password, password_confirmation,
}) => {
  const response = await axios.post('http://localhost:5000/signup', {
    user: {
      full_name, email, password, password_confirmation,
    },
  });
  return response.data;
});

const signupSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default signupSlice.reducer;
