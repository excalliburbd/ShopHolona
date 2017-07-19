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
              dispatch(addNotification({
                title: 'Success',
                message: 'Successfull updated product name',
                position: 'bl',
                status: 'success',
              }));
            }
          ).catch(
            err => {
              // Fetching error details
              dispatch(cartActions.cart.done.get(new Error(err)));
              dispatch(addNotification({
                title: 'Error during shop update',
                message: info.shop_name[0],
                position: 'bl',
                status: 'error',
              }));
               
            }
          );
  }
}

export const updateCartItem = (cartID, id, quantity, token) => dispatch => {
  // starting address update
  dispatch(cartActions.cart.set.loading);

  dispatch(cartActions.cart.update.item({id: cartID, quantity}));

  if (token) {
    request(`/me/carts/${cartID}/`, getConfig(
            token,
            null,
            'DELETE'
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
                        'POST',
                      )).then(
                        res => {
                          // successful
                          dispatch(cartActions.cart.update.itemByVariant({
                            id: cartID,
                            response: res,
                          }));
                          dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfull updated product name',
                            position: 'bl',
                            status: 'success',
                          }));
                        }
                      ).catch(
                        err => {
                          console.log(err)
                          dispatch(cartActions.cart.update.item(cartID, quantity-1))
                          dispatch(addNotification({
                            title: 'Error during shop update',
                            message: info.shop_name[0],
                            position: 'bl',
                            status: 'error',
                          }));
                          
                        }
                      );
            }
          );
  }
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
    dispatch(sidebarActions.sidebar.show.addToCart());

    if (token) {
      dispatch(updateCartItem(
        cart[cartItem].id,
        id,
        (cart[cartItem].quantity + 1),
        token
      ));
    }
  } else {
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
    dispatch(sidebarActions.sidebar.show.addToCart());

    if (token) {
      request('/me/carts/', getConfig(
              token,
              {
                product_variance_attribute: id,
                quantity: 1
              },
              'POST'
            )).then(
              res => {
                // success
                dispatch(cartActions.cart.update.itemByVariant({
                  id: newCartItem.id,
                  response: res,
                }));
                dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfull updated product name',
                  position: 'bl',
                  status: 'success',
                }));
              }
            );
    }
  }
}

export const deleteCartItem = (id, token) => dispatch => {
  // starting address delete
  dispatch(cartActions.cart.set.loading);

  if (token) {
    request(`/me/carts/${id}/`, getConfig(
            token,
            null,
            'DELETE'
          )).then(
            res => {
              // successful
              dispatch(cartActions.cart.done.delete(id))
              dispatch(addNotification({
                title: 'Success',
                message: 'Successfull updated product name',
                position: 'bl',
                status: 'success',
              }));
            }
          );
  }
}

export const checkout = (total, cart, address, token) => dispatch => {
  if (token) {
    const today = new Date();

    request('/me/orders/', getConfig(
              token,
              {
                to_address: 16,
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
                console.log(res)
                dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfull updated product name',
                  position: 'bl',
                  status: 'success',
                }));
              }
            )
  }
}
