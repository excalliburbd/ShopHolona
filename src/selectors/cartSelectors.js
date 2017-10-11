import { createSelector } from 'reselect';

const getCartArray = state => state.cart.items;
const getCartObjects = state => state.entities.cart;
export const getCartLoading = state => state.cart.loading;

export const getTotal = createSelector(
  [getCartArray, getCartObjects],
  (cartArr, cartObj) => cartArr.reduce(
    (acc, item) => ({
      price: (acc.price + (cartObj[item].quantity * cartObj[item].product.price)),
      weight: (acc.weight + (cartObj[item].quantity * cartObj[item].product.weight)),
    })
  , {
    price: 0,
    weight: 0,
  })
);

export const getCartItems = createSelector(
  [getCartArray, getCartObjects],
  (cartArr, cartObj) => {
    return cartArr.map(
      id => cartObj[id]
    );
  }
);
