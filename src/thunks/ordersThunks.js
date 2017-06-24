import { request, getConfig } from './helpers';

import { orderActions } from '../actions';

export const getOrderList = (shop, token) => dispatch => {

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
