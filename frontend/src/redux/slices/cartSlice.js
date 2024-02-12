import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  bouquetItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { info, type } = action.payload;

      const itemIndex = state[type + 'Items'].findIndex(
        (item) => item.id === info.id,
      );
      if (itemIndex >= 0) {
        state[type + 'Items'][itemIndex].cardQuantity += 1;
      } else {
        const tempProduct = { ...info, cardQuantity: 1 };
        state[type + 'Items'].push(tempProduct);
      }
    },
    removeFromCart(state, action) {
      const { info, type } = action.payload;

      const newCartItems = state[type + 'Items'].filter(
        (cartItem) => cartItem.id !== info.id,
      );
      state[type + 'Items'] = newCartItems;
    },
    decreaseCart(state, action) {
      const { info, type } = action.payload;

      const itemIndex = state[type + 'Items'].findIndex(
        (item) => item.id === info.id,
      );
      if (state[type + 'Items'][itemIndex].cardQuantity > 1) {
        state[type + 'Items'][itemIndex].cardQuantity -= 1;
      } else {
        const newCartItems = state[type + 'Items'].filter(
          (cartItem) => cartItem.id !== info.id,
        );
        state[type + 'Items'] = newCartItems;
      }
    },
    increaseCart(state, action) {
      const { info, type } = action.payload;

      const itemIndex = state[type + 'Items'].findIndex(
        (item) => item.id === info.id,
      );
      state[type + 'Items'][itemIndex].cardQuantity += 1;
    },
    clearCart(state, action) {
      const { type } = action.payload;

      state[type + 'Items'] = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  increaseCart,
  clearCart,
} = cartSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
