import { addNotification } from 'reapop';

import { request, getConfig } from './helpers';

import { sidebarActions } from '../actions/';

export const checkout = (total, cart, address, token) => dispatch => {
  if (token) {
    const today = new Date();

    request('/me/orders/', getConfig(
              token,
              {
                to_address: address,
                order_status: 1,
                total_price: total.price,
                total_weight: total.weight,
                additional_comments: 'no comment',
                order_payment: {
                  amount_paid: 0,
                  date_paid: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
                  order_confirmation: 'confirmed?!',
                  payment_type: 0
                },
                carts_id: cart.map( ({ id }) => id)
              },
              'POST'
            )).then(
              res => {
                if (res.id) {
                  dispatch(sidebarActions.sidebar.hide());
                  dispatch(addNotification({
                    title: 'Successfully Checked Out',
                    message: 'Your order has been placed!',
                    position: 'bl',
                    status: 'success',
                  }));
                }
              }
            )
  }
}
