import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  cartActions,
  sidebarActions,
} from '../actions/';

import { totalPrice } from '../selectors/cartSelectors';
import { getProductsObj } from '../selectors/productSelectors';

import Cart from '../components/Cart/Cart';

const mapStateToProps = state => {
  return {
    cartItems: state.cart.items,
    totalPrice: totalPrice(state),
    products: getProductsObj(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCartItem: (token, id, res) =>  {
      dispatch(cartActions.cart.update.item(token, id, res))
    },
    deleteCartItem: (token, id) => {
      dispatch(cartActions.cart.done.delete(token, id))
    },
  }
}

const CartContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));

export default CartContainer;
