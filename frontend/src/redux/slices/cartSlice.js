import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  bouquetItems: [],
};
const updateLocalStorage = (type, items) => {
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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initiateCart(state, action) {
      const { type, items } = action.payload;
      state[type + 'Items'] = items;
    },
    addToCart(state, action) {
      const saveToLocalStorage = (item) => {
        const { id, orderItemsCompositions } = item;
        let items = JSON.parse(localStorage.getItem(type)) || [];
        const isExist = items.some((item) => item.id === id);

        if (!Array.isArray(items)) {
          items = [];
        }
        if (isExist) {
          items = items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  cardQuantity: item.cardQuantity + 1,
                }
              : item,
          );
        } else {
          const newItem = orderItemsCompositions
            ? {
                id: id,
                cardQuantity: 1,
                orderItemsCompositions: orderItemsCompositions,
              }
            : { id: id, cardQuantity: 1 };

          items.push(newItem);
        }
        updateLocalStorage(type, items);
      };
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
      saveToLocalStorage(info);
    },
    removeFromCart(state, action) {
      const removeFromLocalStorage = (id) => {
        let items = JSON.parse(localStorage.getItem(type)) || [];
        const isExist = items.some((item) => item.id === id);

        if (isExist) {
          items = items.filter((item) => item.id !== id);
        }

        updateLocalStorage(type, items);
      };
      const { info, type } = action.payload;
      const newCartItems = state[type + 'Items'].filter(
        (cartItem) => cartItem.id !== info.id,
      );
      state[type + 'Items'] = newCartItems;
      removeFromLocalStorage(info.id);
    },
    decreaseCart(state, action) {
      const decreaseInLocalStorage = (id) => {
        let items = JSON.parse(localStorage.getItem(type)) || [];

        items = items.map((item) =>
          item.id === id
            ? {
                id: item.id,
                cardQuantity: item.cardQuantity - 1,
              }
            : item,
        );

        updateLocalStorage(type, items);
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
      decreaseInLocalStorage(info.id);
    },
    increaseCart(state, action) {
      const increaseInLocalStorage = (id) => {
        let items = JSON.parse(localStorage.getItem(type)) || [];

        items = items.map((item) =>
          item.id === id
            ? {
                id: item.id,
                cardQuantity: item.cardQuantity + 1,
              }
            : item,
        );

        updateLocalStorage(type, items);
      };
      const { info, type } = action.payload;

      const itemIndex = state[type + 'Items'].findIndex(
        (item) => item.id === info.id,
      );
      state[type + 'Items'][itemIndex].cardQuantity += 1;
      increaseInLocalStorage(info.id);
    },
    clearCart(state, action) {
      const { type } = action.payload;
      localStorage.removeItem(type);
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
  initiateCart,
} = cartSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
