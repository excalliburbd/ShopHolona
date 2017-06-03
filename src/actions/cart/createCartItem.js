import * as types from '../../constants/cart'
import api from '../../api'

const createCartItem = payload => dispatch => {
  dispatch({type: types.CART_ITEM_ADD})

  api.cart.addToCart(payload).then(response => {
    // success
    dispatch({
      type: types.CART_ITEM_ADD_SUCCESS,
      payload: response
    })
  }).catch(error => {
    // Error details
    dispatch({
      type: types.CART_ITEM_ADD_ERROR,
      payload: error
    })
  })
}

export default createCartItem
