import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  cartActions,
  sidebarActions,
} from '../actions/';

import { getTotal, getCartItems } from '../selectors/cartSelectors';
import { getProductsObj } from '../selectors/productSelectors';
import { getToken } from '../selectors/userSelectors';

import { deleteCartItem, updateCartItem } from '../thunks/cartThunks';

import Cart from '../components/Cart/Cart';

const mapStateToProps = state => {
  return {
    cartItems: getCartItems(state),
    total: getTotal(state),
    products: getProductsObj(state),
    token: getToken(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCartItem: (cartID, id, quantity, token) =>  {
      if (token) {
        dispatch(updateCartItem(cartID, id, quantity, token));
      } else {
        dispatch(cartActions.cart.update.item({id: cartID, quantity}))
      }
    },
    deleteCartItem: (id, token) => {
      if (token) {
        dispatch(deleteCartItem(id, token))
      } else {
        dispatch(cartActions.cart.done.delete(id))
      }
    },
  }
}

const CartContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));

export default CartContainer;
