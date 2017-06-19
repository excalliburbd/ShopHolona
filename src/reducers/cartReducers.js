import { handleActions } from 'redux-actions';

import {
  cartActions,
  userActions,
} from '../actions/';

export const cartReducer = handleActions({
  [cartActions.cart.set.loading]: (state, action) => {
    return {
      ...state,
      loading: true
    }
  },
  [cartActions.cart.done.get]: {
    next(state, action) {
      const cartItems = state.items;

      action.payload.forEach(
        item => {
          if (cartItems.indexOf(item.id) === -1) {
            cartItems.unshift(item.id);
          }
        }
      );

      return {
        ...state,
        loading: false,
        error: null,
        items: cartItems
      }
    },
    throw(state, action) {
      return {
        ...state,
        loading: false,
        items: [],
        error: action.payload,
      }
    }
  },
  [cartActions.cart.add.item]: (state, action) => {

    if (state.items.indexOf(action.payload.id) === -1) {
      return {
        ...state,
        items: [action.payload.id, ...state.items]
      }
    }
    return state;
  },
  [cartActions.cart.done.delete]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      items: state.items.filter(item => item !== action.payload)
    }
  },
  [userActions.user.manualSignOut]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: undefined,
      items: [],
    }
  },
}, {
  loading: false,
  error: undefined,
  items: [],
});

export const cartEntitiesReducer = handleActions({
  [cartActions.cart.done.get]: {
    next(state, action) {
      const cartItems = {};

      action.payload.forEach(
        item => {
          const variantID = item.product_variance_attribute.variance.id;
          const attributeID = item.product_variance_attribute.id;

          const productSpecs = item.product.variances
                                .find(
                                  variant => (variant.id === variantID)
                                ).attributes.find(
                                  attribute => (attribute.id === attributeID)
                                );

          const {
            price,
            weight,
            stock,
          } = productSpecs;

          cartItems[item.id] = {
            ...item,
            product: {
              ...item.product,
              price,
              weight,
              stock
            }
          };
        }
      );

      return {
        ...state,
        ...cartItems,
      }
    },
    throw(state, action) {
      return state;
    }
  },
  [cartActions.cart.add.item]: (state, action) => {

    return {
      ...state,
      [action.payload.id]: action.payload
    }
  },
  [cartActions.cart.done.delete]: (state, action) => {
    const cart = { ...state };

    delete cart[action.payload];

    return cart;
  },
  [cartActions.cart.update.item]: (state, action) => {
    const {
      id,
      quantity
    } = action.payload;

    return {
      ...state,
      [id]: {
        ...state[id],
        quantity
      }
    }
  },
}, {

});
