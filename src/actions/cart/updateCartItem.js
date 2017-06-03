import * as types from '../../constants/cart'
import api from '../../api'

const updateCartItem = (id, payload) => dispatch => {
  // starting address update
  dispatch({type: types.CART_ITEM_UPDATE})
  api.cart.updateCartItem(id, payload).then(response => {

    // successful
    dispatch({
      type: types.CART_ITEM_UPDATE_SUCCESS,
      id,
      payload: response
    })
  }).catch(error => {
    // Fetching error details
    dispatch({
      type: types.CART_ITEM_UPDATE_ERROR,
      payload: error
    })
  })
}

export default updateCartItem;
