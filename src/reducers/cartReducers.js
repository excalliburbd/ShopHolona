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
  [cartActions.cart.update.itemByVariant]: (state, action) => {
    const {
      id,
      response,
    } = action.payload;

    return {
      ...state,
      items: state.items.map(
        cartID => {
          if (cartID === id) {
            return response.id;
          }

          return cartID;
        }
      )
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
    const variantID = action.payload.product_variance_attribute.variance.id;
    const attributeID = action.payload.product_variance_attribute.id;

    const productSpecs = action.payload.product.variances
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

    return {
      ...state,
      [action.payload.id]: {
        ...action.payload,
        product: {
          ...action.payload.product,
          price,
          weight,
          stock
        }
      }
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
  [cartActions.cart.update.itemByVariant]: (state, action) => {
    const {
      response,
    } = action.payload;

    const variantID = response.product_variance_attribute.variance.id;
    const attributeID = response.product_variance_attribute.id;

    const productSpecs = response.product.variances
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

    return {
      ...state,
      [response.id] : {
        ...response,
        product: {
          ...response.product,
          price,
          weight,
          stock,
        }
      }
    }
  },
}, {

});
