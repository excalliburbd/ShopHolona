import * as types from '../../constants/cart'
import api from '../../api'

const deleteCartItem = id => dispatch => {
  // starting address delete
  dispatch({type: types.CART_ITEM_DELETE})

  api.cart.deleteCartItem(id).then(response => {
    // successful
    dispatch({
      type: types.CART_ITEM_DELETE_SUCCESS,
      id,
    })
  }).catch(error => {
    // Fetching error details
    dispatch({
      type: types.CART_ITEM_DELETE_ERROR,
      payload: error
    })
  })
}

export default deleteCartItem;
