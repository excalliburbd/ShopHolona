import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addNotification } from 'reapop';

import {
  cartActions,
  sidebarActions,
  userActions,
} from '../actions/';

import { getTotal, getCartItems } from '../selectors/cartSelectors';
import { getProductsObj } from '../selectors/productSelectors';
import { getToken } from '../selectors/userSelectors';

import { deleteCartItem, updateCartItem, checkout } from '../thunks/cartThunks';

import Cart from '../components/Cart/Cart';

const mapStateToProps = state => {
  return {
    cartItems: getCartItems(state),
    total: getTotal(state),
    products: getProductsObj(state),
    token: getToken(state),
    sidebarType: state.ui.sidebar.subType,
    address: state.ui.user.address,
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
    handleShowCheckout: (token) => {
      if (!token) {
        dispatch(addNotification({
          title: 'Please Log In',
          message: `Log In or Sign Up to checkout`,
          position: 'bl',
          status: 'error',
        }));
        dispatch(sidebarActions.sidebar.show.signIn());
      } else {
        dispatch(sidebarActions.sidebar.show.checkout());
      }
    },
    handleCheckout: (total, cart, address, token) => {
      dispatch(checkout(total, cart, address, token));
    },
    handleAddress: value => {
      dispatch(userActions.user.ui.address(value));
    },
  }
}

const CartContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));

export default CartContainer;
