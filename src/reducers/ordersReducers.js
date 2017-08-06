import { handleActions } from 'redux-actions';

import { orderActions } from '../actions';

export const ordersReducer = handleActions({
  [orderActions.orders.done.get.all]: (state, action) => {
      const orders = state;

      action.payload.forEach(
        order => {
          if(orders.indexOf(order.id) === -1) {
            orders.unshift(order.id)
          }
        }
      )

      return orders;
  }
}, [

]);

export const ordersEntityReducer = handleActions({
  [orderActions.orders.done.get.all]: (state, action) => {
      const orders = {
        ...state
      }

      action.payload.forEach(
        order => {
          if (orders[order.id]) {
            orders[order.id] = {
              ...orders[order.id],
              ...order,
            }
          } else {
            orders[order.id] = {
              ...order,
            }
          }
        }
      )

    return orders;
  }
}, {

});
