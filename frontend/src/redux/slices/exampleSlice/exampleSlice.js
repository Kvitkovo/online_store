import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exampleState: false,
  exampleCountState: 0,
};

export const exampleSlice = createSlice({
  name: 'exampleSlice',
  initialState,
  reducers: {
    updateExampleState: (state, action) => {
      state.exampleState = action.payload;
    },
    updateExampleCount: (state, action) => {
      state.exampleCountState = action.payload;
    },
  },
});

export const { updateExampleState, updateExampleCount } = exampleSlice.actions;

export const exampleSliceReducer = exampleSlice.reducer;

export const exampleStateSelector = (state) =>
  state.exampleSliceReducer.exampleState;
export const exampleCountStateSelector = (state) =>
  state.exampleSliceReducer.exampleCountState;
