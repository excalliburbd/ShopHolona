import api from '../../api'
import * as types from '../../constants/cart'

const fetchCart = () => dispatch => {
  dispatch({type: types.CART_FETCH})
  api.cart.getCart().then(response => {
    // Cart fetching successful
    dispatch({
      type: types.CART_FETCH_SUCCESS,
      payload: response
    })
  }).catch(error => {
    // Fetching error details
    dispatch({
      type: types.CART_FETCH_ERROR,
      payload: error
    })
  })
}

export default fetchCart;
