/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    user: { email, password },
  });
  if (response.status >= 200 && response.status < 300) {
    const authorizationHeader = response.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
    localStorage.setItem('token', token);
    return token;
  }
  throw new Error(response);
});

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete(`${BASE_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('token');
        return { success: true };
      }
      return thunkAPI.rejectWithValue('Logout failed');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/current_user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        return response.data.data;
      }

      return thunkAPI.rejectWithValue('Request failed');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const signup = createAsyncThunk('auth/signup', async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/signup`, {
    user: { email, password, password_confirmation: password },
  });
  if (response.status === 201) {
    return response.data;
  }
  throw new Error(response.data.errors);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: null,
    name: null,
    token: null,
    isLoading: false,
    error: null,
    loggedIn: false,
    currentUser: null, // Initial state
  },
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoading = false;
        state.error = null;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
        state.id = null;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = {
          id: action.payload.id,
          email: action.payload.email,
          fullName: action.payload.full_name, // Map full_name to fullName
        };
        state.id = action.payload.id;
        state.name = action.payload.full_name; // Retain original for backward compatibility
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserId } = authSlice.actions;
export default authSlice.reducer;
