import * as types from '../constants/cart';
import { ACCOUNT_LOGOUT_SUCCESS } from '../constants/account';

const initialState = {
  loading: false,
  error: undefined,
  items: [],
}

const Cart = (state = initialState, action) => {
  switch (action.type){
    // Fetch cart
    case types.CART_FETCH:
    case types.CART_ITEM_ADD:
    case types.CART_ITEM_DELETE:
    case types.CART_ITEM_UPDATE:
      return {
        ...state,
        loading: true
      };

    case types.CART_FETCH_ERROR:
    case types.CART_ITEM_ADD_ERROR:
    case types.CART_ITEM_DELETE_ERROR:
    case types.CART_ITEM_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: null,
      }

    case types.CART_FETCH_SUCCESS:
    case types.CART_ITEM_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: [...state.items, ...action.payload]
      }

    case types.CART_ITEM_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: state.items.map(item => {
          if (item.id === action.id) {
            return {
              ...item,
              ...action.payload
            }
          }
          return null
        })
      }

    case types.CART_ITEM_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: state.items.filter(item => item.id !== action.id)
      }

    case ACCOUNT_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: null,
      }

    default:
      return state;
  }
}

export default Cart;
