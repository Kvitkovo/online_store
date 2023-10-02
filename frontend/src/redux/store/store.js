import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers/index';

export const store = configureStore({
  reducer,
});
