import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
export const getUser = (state) => state.user;
