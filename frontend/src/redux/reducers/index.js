import { combineReducers } from 'redux';
import { exampleSliceReducer } from '../slices/exampleSlice/exampleSlice';
import { cartSliceReducer } from '../slices/cartSlice';
import { userSliceReducer } from '../slices/userSlice';
import { catalogSliceReducer } from '../slices/catalogSlice';

const reducer = combineReducers({
  exampleSliceReducer,
  cartSliceReducer,
  menu: catalogSliceReducer,
  user: userSliceReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_ALL_REDUCERS') {
    return reducer(undefined, action);
  }

  return reducer(state, action);
};

export default rootReducer;
