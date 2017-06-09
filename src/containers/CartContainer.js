import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  cartActions,
  sidebarActions,
} from '../actions/';

import { totalPrice } from '../selectors/cartSelectors';

import Cart from '../components/Cart/Cart';

const mapStateToProps = state => {
  return {
    cartItems: state.cart.items,
    totalPrice: totalPrice(state),
    products: state.entities.products,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCartItem: (id, res) =>  {
      dispatch(cartActions.cart.update.item(id, res))
    },
    deleteCartItem: (id) => {
      dispatch(cartActions.cart.done.delete(id))
    },
  }
}

const CartContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));

export default CartContainer;
