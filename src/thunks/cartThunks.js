import uuid from "uuid";

import { request, getConfig } from './helpers';

import { cartActions, sidebarActions } from '../actions/';

export const getCart = (token, show) => dispatch => {
  dispatch(cartActions.cart.set.loading);

  if (token) {
    request(`/me/carts/`, getConfig(
            token
          )).then(
            res => {
              // Cart fetching successful
              dispatch(cartActions.cart.done.get(res));
              show && dispatch(sidebarActions.sidebar.show.addToCart());
            }
          ).catch(
            err => {
              // Fetching error details
              dispatch(cartActions.cart.done.get(new Error(err)));
            }
          );
  }
}

export const updateCartItem = (cartID, id, quantity, token) => dispatch => {
  // starting address update
  dispatch(cartActions.cart.set.loading);

  dispatch(cartActions.cart.update.item({id: cartID, quantity}));

  request(`/me/carts/${cartID}/`, getConfig(
            token,
            null,
            'delete'
          )).then(
            res => {
              // successful
              // dispatch(cartActions.cart.done.delete(cartID));

              request(`/me/carts/`, getConfig(
                        token,
                        {
                          product_variance_attribute: id,
                          quantity,
                        },
                        'post',
                      )).then(
                        res => {
                          // successful
                          dispatch(cartActions.cart.update.itemByVariant({
                            id: cartID,
                            response: res,
                          }));
                        }
                      ).catch(
                        err => {
                          console.log(err)
                          dispatch(cartActions.cart.update.item(cartID, quantity-1))
                        }
                      );
            }
          );
}

export const addToCart = (id, token, productID) => (dispatch, getState) => {
  dispatch(cartActions.cart.set.loading);

  const cart = getState().entities.cart;
  const product = productID ? getState().entities.products[productID] : productID;

  const cartItem = Object.keys(cart).find(
    item => (cart[item].product_variance_attribute.id === id)
  );

  const variantID = productID ?
    product.variances[product.selectedVariant].id
    : productID;

  if (cartItem) {
    dispatch(cartActions.cart.update.item({
      id: cart[cartItem].id,
      quantity: (cart[cartItem].quantity + 1)
    }));

    if (token) {
      dispatch(updateCartItem(
        cart[cartItem].id,
        id,
        (cart[cartItem].quantity + 1),
        token
      ));
    }
  }

  const newCartItem = {
    id: uuid.v4(),
    user: null,
    product_variance_attribute: {
      id: id,
      variance: {
        id: variantID
      }
    },
    product,
    quantity: 1
  }

  dispatch(cartActions.cart.add.item(newCartItem));

  if (token) {
    request('/me/carts/', getConfig(
            token,
            {
              product_variance_attribute: id,
              quantity: 1
            },
            'post'
          )).then(
            res => {
              // success
              dispatch(cartActions.cart.update.itemByVariant({
                id: newCartItem.id,
                response: res,
              }));
            }
          );
  }
}

export const deleteCartItem = (id, token) => dispatch => {
  // starting address delete
  dispatch(cartActions.cart.set.loading);

  if (token) {
    request(`/me/carts/${id}/`, getConfig(
            token,
            null,
            'delete'
          )).then(
            res => {
              // successful
              dispatch(cartActions.cart.done.delete(id))
            }
          );
  }
}

export const checkout = (token) => dispatch => {
  if (token) {
    request('/me/orders/', getConfig(
              token,
              {
                "to_address": "string",
                "order_status": 1,
                "total_price": 0,
                "total_weight": 0,
                "order_payment": {
                  "amount_paid": 0,
                  "date_paid": new Date(),
                  "order_confirmation": "hoy nai",
                  "payment_type": 0
                },
                "carts_id": []
              },
              'post'
            ))
  }
}
