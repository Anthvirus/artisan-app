// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import userListReducer from './slices/userListSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    userList: userListReducer
  },
});

export default store;
