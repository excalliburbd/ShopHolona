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
      return {
        ...state,
        loading: false,
        error: null,
        items: [...state.items, ...action.payload]
      }
    },
    throw(state, action) {
      return {
        ...state,
        loading: false,
        items: null,
        error: action.payload,
      }
    }
  },
  [cartActions.cart.add.item]: (state, action) => {

    const existingItem = state.items.find(
      item => item.varianceId === action.payload.varianceId
    );

    if (existingItem) {
      return {
        ...state,
        loading: false,
        error: null,
        items: state.items.map(item => {
          if (item === existingItem) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
      }
    }

    return {
      ...state,
      loading: false,
      error: null,
      items: [...state.items, action.payload]
    }
  },
  [cartActions.cart.update.item]: (state, action) => {
    return {
      ...state,
      items: state.items.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload.res
          }
        }
        return item;
      })
    }
  },
  [cartActions.cart.done.delete]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      items: state.items.filter(item => item.id !== action.payload)
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
