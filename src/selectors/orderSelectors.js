import { createSelector } from 'reselect';

export const getOrdersArray = state => state.orders;
export const getOrdersObj = state => state.entities.orders;

export const getAllOrders = createSelector(
  [getOrdersArray, getOrdersObj],
  (ordersArr, ordersObj) => {
    return ordersArr.map(
      id => ({
       orderID: id,
       orderArr: ordersObj[id],
      })
    )
  }
);
