import { createSelector } from 'reselect';

export const getOrdersArray = state => state.orders;
export const getOrdersObj = state => state.entities.orders;
export const getSelectedOrderID = state => state.ui.backOffice.selectedOrder;

export const getAllOrders = createSelector(
  [getOrdersArray, getOrdersObj],
  (ordersArr, ordersObj) => {
    return ordersArr.map(
      id => ({
       orderID: id,
       orderArr: ordersObj[id],
      })
    );
  }
);

export const getSelectedOrder = createSelector(
  [getSelectedOrderID, getOrdersObj],
  (id, orders) => {
    return orders[id];
  }
)
