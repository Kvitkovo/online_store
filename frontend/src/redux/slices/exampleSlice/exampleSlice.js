import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exampleState: false,
  exampleData: null,
};

export const exampleSlice = createSlice({
  name: 'exampleSlice',
  initialState,
  reducers: {
    updateExampleState: (state, action) => {
      state.exampleState = action.payload;
    },
    updateExampleData: (state, action) => {
      state.exampleData = action.payload;
    },
  },
});

export const { updateExampleState, updateExampleData } = exampleSlice.actions;

export const exampleSliceReducer = exampleSlice.reducer;
export const addBankStateSelector = (state) => state.exampleSliceReducer;
export const exampleStateSelector = (state) =>
  state.exampleSliceReducer.exampleState;
export const exampleDataSelector = (state) =>
  state.exampleSliceReducer.exampleData;
