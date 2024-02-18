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
      const saveToLocalStorige = (id) => {
        let items = JSON.parse(localStorage.getItem(type)) || [];
        const isExist = items.some((item) => item.id === id);

        if (!Array.isArray(items)) {
          items = [];
        }
        if (isExist) {
          items = items.map((item) =>
            item.id === id
              ? {
                  id: item.id,
                  cardQuantity: item.cardQuantity + 1,
                }
              : item,
          );
        } else {
          const newItem = { id: id, cardQuantity: 1 };
          items.push(newItem);
        }
        try {
          localStorage.setItem(type, JSON.stringify(items));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      };
      const { info, type } = action.payload;

      const itemIndex = state[type + 'Items'].findIndex(
        (item) => item.id === info.id,
      );
      if (itemIndex >= 0) {
        state[type + 'Items'][itemIndex].cardQuantity += 1;
        saveToLocalStorige(
          info.id,
          state[type + 'Items'][itemIndex].cardQuantity + 1,
        );
      } else {
        const tempProduct = { ...info, cardQuantity: 1 };
        state[type + 'Items'].push(tempProduct);
      }
      saveToLocalStorige(info.id);
    },
    removeFromCart(state, action) {
      const removeFromLocalStorige = (id) => {
        let items = JSON.parse(localStorage.getItem(type)) || [];
        const isExist = items.some((item) => item.id === id);

        if (isExist) {
          items = items.filter((item) => item.id !== id);
        }

        try {
          if (items.length > 0) {
            localStorage.setItem(type, JSON.stringify(items));
          } else {
            localStorage.removeItem(type);
          }
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      };
      const { info, type } = action.payload;
      const newCartItems = state[type + 'Items'].filter(
        (cartItem) => cartItem.id !== info.id,
      );
      state[type + 'Items'] = newCartItems;
      removeFromLocalStorige(info.id);
    },
    decreaseCart(state, action) {
      const decreaseInLocalStorige = (id) => {
        let items = JSON.parse(localStorage.getItem(type)) || [];

        items = items.map((item) =>
          item.id === id
            ? {
                id: item.id,
                cardQuantity: item.cardQuantity - 1,
              }
            : item,
        );

        try {
          localStorage.setItem(type, JSON.stringify(items));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      };
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
      decreaseInLocalStorige(info.id);
    },
    increaseCart(state, action) {
      const increaseInLocalStorige = (id) => {
        let items = JSON.parse(localStorage.getItem(type)) || [];

        items = items.map((item) =>
          item.id === id
            ? {
                id: item.id,
                cardQuantity: item.cardQuantity + 1,
              }
            : item,
        );

        try {
          localStorage.setItem(type, JSON.stringify(items));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      };
      const { info, type } = action.payload;

      const itemIndex = state[type + 'Items'].findIndex(
        (item) => item.id === info.id,
      );
      state[type + 'Items'][itemIndex].cardQuantity += 1;
      increaseInLocalStorige(info.id);
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
