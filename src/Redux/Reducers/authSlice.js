/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const BASE_API_URL = 'http://localhost:5000/api/v1/';

// Login action
export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    user: { email, password },
  });

  if (response.status >= 200 && response.status < 300) {
    const { authorization: authorizationHeader } = response.headers;
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
    localStorage.setItem('token', token);
    return token;
  }
  throw new Error(response.statusText);
});

// Logout action
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${BASE_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

// Fetch current user action
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
      return response.data; // Include 'role' in the response data
    }

    return thunkAPI.rejectWithValue('Request failed');
  } catch (error) {
    return thunkAPI.rejectWithValue('Request failed');
  }
});

// Fetch all users action
export const fetchUsers = createAsyncThunk('auth/fetchUsers', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    const response = await axios.get(`${BASE_API_URL}/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data; // Return list of users
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
    role: null, // Add role to the initial state
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
    loggedIn: !!localStorage.getItem('token'),
    currentUser: null,
    users: [], // Add users to store the list of users
  },
  reducers: {
    setUserId: (state, { payload }) => {
      state.id = payload;
    },
    clearAuthState: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.role = null; // Clear the role when logging out
      state.token = null;
      state.loggedIn = false;
      state.currentUser = null;
      state.users = []; // Clear users when logging out
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload;
        state.isLoading = false;
        state.error = null;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
        state.id = null;
        state.name = null;
        state.email = null;
        state.role = null; // Ensure role is cleared when logged out
        state.token = null;
        state.currentUser = null;
        state.users = []; // Clear users on logout
        localStorage.removeItem('token');
      })
      .addCase(logout.rejected, (state) => {
        state.loggedIn = false;
        state.id = null;
        state.name = null;
        state.email = null;
        state.role = null; // Ensure role is cleared when logged out
        state.token = null;
        state.currentUser = null;
        state.users = []; // Clear users on logout
        localStorage.removeItem('token');
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.id = payload.id;
        state.name = payload.full_name;
        state.email = payload.email;
        state.role = payload.role; // Assign the role here
        state.currentUser = payload;
        state.loggedIn = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload; // Store the list of users
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { setUserId, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
