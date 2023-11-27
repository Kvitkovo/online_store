export const isItemInCart = (cartItems, itemId) => {
  return cartItems.some((el) => el.id === itemId);
};
