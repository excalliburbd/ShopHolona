import { request, getConfig } from './helpers';

import { orderActions } from '../actions';

export const getOrderList = (shop, token) => dispatch => {

  if (token) {
    request(`/vendors/shops/${shop}/orders/`, getConfig(
            token,
          )).then(
            res => {
              if (res.length > 0) {
                dispatch(orderActions.orders.done.get.all(res));
              }
            }
          );
  }
}

export const changeOrderStatus = (shop, token, order, status) => dispatch => {

  if (token) {
    request(`/vendors/shops/${shop}/orders/${order}/details`, getConfig(
            token,
          )).then(
            res => {
              request(`/vendors/shops/${shop}/orders/${order}/`, getConfig(
                token,
                {
                  orderdetails: res.map( ({ id }) => id ),
                  order_status: status
                },
                'PUT'
              )).then(
                res => {
                  if (res.order_status) {
                    dispatch(getOrderList(shop, token));
                  }
                }
              )
            }
          );
  }
}
