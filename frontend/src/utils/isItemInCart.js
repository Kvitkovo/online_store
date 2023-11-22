export const isItemInCart = (cartItems, itemId) => {
  if (cartItems && cartItems.length > 0) {
    return cartItems.some((el) => el.id === itemId);
  }
  return false;
};
