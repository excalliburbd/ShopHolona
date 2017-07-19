import { request, getConfig } from './helpers';
import { addNotification } from 'reapop';

import { orderActions } from '../actions';

export const getOrderList = (shop, token) => dispatch => {

  if (token) {
    request(`/vendors/shops/${shop}/orders/`, getConfig(
            token,
          )).then(
            res => {
              if (res.length > 0) {
                dispatch(orderActions.orders.done.get.all(res));
                dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfully recieved order list',
                  position: 'bl',
                  status: 'success',
                }));
              }
            }
          );
  }
}
