import { createSelector } from 'reselect';

export const cartItems = state => state.cart.items;

export const totalPrice = createSelector(
  [cartItems],
  items => items.reduce((acc, item) => (acc + item.quantity * item.price), 0)
);
