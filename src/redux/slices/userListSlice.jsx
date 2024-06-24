// src/redux/slices/usersListSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../constants/server';

// Async thunk for listing all users
export const listUsers = createAsyncThunk(
  'usersList/listUsers',
  async () => {
    const response = await fetch(`${baseUrl}/users/all`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch users');
    }
    return data;
  }
);

// Async thunk for searching users
export const searchUsers = createAsyncThunk(
  'usersList/searchUsers',
  async (searchTerm) => {
    const response = await fetch(`${baseUrl}/users/search?query=${searchTerm}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to search users');
    }
    return data;
  }
);

// Initial state
const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create slice
const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersListSlice.reducer;
