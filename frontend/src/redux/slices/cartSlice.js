import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cardQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cardQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
    removeFromCart(state, action) {
      const newCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id,
      );
      state.cartItems = newCartItems;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (state.cartItems[itemIndex].cardQuantity > 1) {
        state.cartItems[itemIndex].cardQuantity -= 1;
      } else {
        const newCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id,
        );
        state.cartItems = newCartItems;
      }
    },
    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.cartItems[itemIndex].cardQuantity += 1;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, increaseCart } =
  cartSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
