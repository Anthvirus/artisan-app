// src/redux/slices/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { baseUrl } from '../../../constants/server';


// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials) => {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }
    return data;
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (userInfo) => {
    const response = await fetch(`${baseUrl}/users/register`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to signup');
    }
    return data;
  }
);

// Async thunk for viewing user profile
export const viewUser = createAsyncThunk(
  'user/viewUser',
  async (userId) => {
    const response = await fetch(`${baseUrl}/users/${userId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user');
    }
    return data;
  }
);

// Async thunk for editing user profile
export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ userId, userData }) => {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to edit user');
    }
    return data;
  }
);

// Initial state
const initialState = {
  user: null,
  userId: localStorage.getItem('userId') || null, // Store the user ID separately
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userId = null;
      localStorage.removeItem('token'); // Remove the token from storage
      localStorage.removeItem('userId');
      localStorage.removeItem('user_type');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('token', action.payload.token); // Store the token
        const decodedToken = jwtDecode(action.payload.token); // Decode the token
        state.userId = decodedToken.id; // Store the user ID in the state
        localStorage.setItem('userId', decodedToken.id);
        localStorage.setItem('user_type', action.payload.user_type);
        console.log('Not Here', decodedToken)
        console.log('Not Here', state.userId)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Store the user ID in the state
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(viewUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(viewUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(viewUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
