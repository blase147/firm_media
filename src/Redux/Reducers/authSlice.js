/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

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

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
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
    localStorage.removeItem('token'); // Ensure token is removed even if backend fails
    return thunkAPI.rejectWithValue('Logout failed');
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    const response = await axios.get(`${BASE_URL}/current_user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    return thunkAPI.rejectWithValue('Request failed');
  } catch (error) {
    return thunkAPI.rejectWithValue('Request failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: null,
    name: null,
    email: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
    loggedIn: !!localStorage.getItem('token'),
    currentUser: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
    },
    clearAuthState: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.loggedIn = false;
      state.currentUser = null;
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
        state.name = null;
        state.email = null;
        state.token = null;
        state.currentUser = null;
        localStorage.removeItem('token');
      })
      .addCase(logout.rejected, (state) => { // Handle rejected case
        state.loggedIn = false;
        state.id = null;
        state.name = null;
        state.email = null;
        state.token = null;
        state.currentUser = null;
        localStorage.removeItem('token');
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.id;
        state.name = action.payload.full_name;
        state.email = action.payload.email;
        state.currentUser = action.payload;
        state.loggedIn = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserId, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
