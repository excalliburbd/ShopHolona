import { request, getConfig } from './helpers';

import { cartActions } from '../actions/';

export const createCartItem = (token, payload) => dispatch => {
  dispatch(cartActions.cart.set.loading);

  request('/me/carts/', getConfig(
            token,
            payload,
            'post'
          )).then(
            res => {
              // success
              dispatch(cartActions.cart.add.item(res))
            }
          );
}

export const deleteCartItem = (token, id) => dispatch => {
  // starting address delete
  dispatch(cartActions.cart.set.loading);

  request(`/me/carts/${id}/`, getConfig(
            token,
            null,
            'delete'
          )).then(
            res => {
              // successful
              dispatch(cartActions.cart.done.delete(id));
            }
          );
}

export const fetchCart = (token) => dispatch => {
  dispatch(cartActions.cart.set.loading);

  request(`/me/carts/`, getConfig(
            token
          )).then(
            res => {
              // Cart fetching successful
              dispatch(cartActions.cart.done.get(res));
            }
          ).catch(
            err => {
              // Fetching error details
              dispatch(cartActions.cart.done.get(new Error(err)));
            }
          );
}

export const updateCartItem = (token, id, payload) => dispatch => {
  // starting address update
  dispatch(cartActions.cart.set.loading);

  request(`/me/carts/${id}/`, getConfig(
            token,
            payload,
            'patch'
          )).then(
            res => {
              // successful
              dispatch(cartActions.cart.update.item(id, res))
            }
          );
}
