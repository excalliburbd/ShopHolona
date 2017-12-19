import uuid from "uuid";
import { addNotification } from 'reapop';

import { request, getConfig, fromState } from './helpers';

import { cartActions, sidebarActions } from '../actions/';

import { getVendor } from '../selectors/userSelectors';

export const getCart = (token, show, initial) => (dispatch, getState) => {
  dispatch(cartActions.cart.set.loading(true));
  const isVendor = getVendor(getState());
  console.log(isVendor)
  if (token) {
    request(`/me/carts/`, getConfig(
            token
          )).then(
            res => {
              // Cart fetching successful
              const products = getState().entities.products;

              dispatch(cartActions.cart.done.get(res.filter(
                item => !!products[item.product.id]
              ).map(
                item => ({
                  ...item,
                  product: {
                    ...products[item.product.id]
                  }
                })
              )));

              if ((show || res.length > 0) && !initial && isVendor) {
                dispatch(sidebarActions.sidebar.show.addToCart());
              }

              dispatch(cartActions.cart.set.loading(false));
            }
          ).catch(
            err => {
              // Fetching error details
              dispatch(cartActions.cart.done.get(new Error(err)));
              dispatch(cartActions.cart.set.loading(false));
            }
          );
  }
}

export const updateCartItem = (cartID, id, quantity, token) => dispatch => {
  // starting address update
  dispatch(cartActions.cart.update.item({id: cartID, quantity}));

  if (token) {
    request(`/me/carts/${cartID}/`, getConfig(
            token,
            {
              quantity
            },
            'PATCH'
          )).then(
            res => {
              (res.quantity === quantity) && dispatch(addNotification({
                title: 'Success',
                message: 'Successfully updated cart item',
                position: 'bl',
                status: 'success',
              }));
            }
          ).catch(
            err => {
              dispatch(cartActions.cart.update.item(cartID, quantity-1))
              dispatch(addNotification({
                title: 'Error Updating Cart Item',
                message: err,
                position: 'bl',
                status: 'error',
              }));
            }
          );
  }
}

export const addToCart = (id, token, productID, action) => (dispatch, getState) => {

  const cart = getState().entities.cart;
  const cartItems = getState().cart.items;
  const product = productID ? getState().entities.products[productID] : productID;

  const cartItem = cartItems.find(
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
    action && action();

    if (token) {
      dispatch(updateCartItem(
        cart[cartItem].id,
        id,
        (cart[cartItem].quantity + 1),
        token
      ));
      dispatch(addNotification({
        title: 'Success',
        message: 'Successfully added to cart',
        position: 'bl',
        status: 'success',
      }));
    }
  } else {
    const newCartItem = {
      id: uuid.v4(),
      user: null,
      product_variance_attribute: {
        id: id,
      },
      variance: {
        id: variantID
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
                const products = getState().entities.products;

                dispatch(cartActions.cart.update.itemByVariant({
                  id: newCartItem.id,
                  response: {
                    ...res,
                    product: {
                      ...products[res.product.id]
                    }
                  },
                }));
                action && action();
                dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfully added to cart.',
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
  dispatch(cartActions.cart.done.delete(id));

  if (token) {
    request(`/me/carts/${id}/`, getConfig(
            token,
            null,
            'DELETE'
          )).then(
            res => {
              // successful
              dispatch(addNotification({
                title: 'Success',
                message: 'Successfully deleted cart item',
                position: 'bl',
                status: 'success',
              }));
            }
          ).catch(
            err => {
              dispatch(cartActions.cart.undo.delete(id));
              dispatch(addNotification({
                title: 'Error',
                message: 'Error deleting cart item',
                position: 'bl',
                status: 'error',
              }))
            }
          );
  }
}

export const validateCart = token => (dispatch, getState) => {
  // starting address delete

  const {
    cart
  } = fromState(getState);

  if (token) {
    cart.list.forEach(
      id => {
        const item = cart.items[id];

        if (!item.user) {
          request('/me/carts/', getConfig(
            token,
            {
              product_variance_attribute: item.product_variance_attribute.id,
              quantity: item.quantity,
            },
            'POST'
          )).then(
            res => {
              // success
              dispatch(cartActions.cart.update.itemByVariant({
                id: item.id,
                response: res,
              }));
            }
          );
        }
      }
    )
  }
}
