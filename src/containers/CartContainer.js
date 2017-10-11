import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addNotification } from 'reapop';

import {
  cartActions,
  sidebarActions,
  userActions,
} from '../actions/';

import { getTotal, getCartItems, getCartLoading } from '../selectors/cartSelectors';
import { getProductsObj } from '../selectors/productSelectors';
import { getToken, getUserAddresses } from '../selectors/userSelectors';

import { deleteCartItem, updateCartItem, checkout } from '../thunks/cartThunks';

import Cart from '../components/Cart/Cart';

const mapStateToProps = state => {
  return {
    cartItems: getCartItems(state),
    total: getTotal(state),
    products: getProductsObj(state),
    token: getToken(state),
    sidebarType: state.ui.sidebar.subType,
    addresses: getUserAddresses(state),
    loading: getCartLoading(state),
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
      dispatch(deleteCartItem(id, token));
    },
    handleShowCheckout: () => {

    },
    handleShowCheckoutAddress: (token) => {
      if (!token) {
        dispatch(addNotification({
          title: 'Please Log In',
          message: `Log In or Sign Up to checkout`,
          position: 'bl',
          status: 'error',
        }));
        dispatch(sidebarActions.sidebar.show.signIn());
      } else {
        dispatch(sidebarActions.sidebar.show.checkoutAddress());
      }
    },
    handleCheckout: (total, cart, address, token) => {
      dispatch(checkout(total, cart, address, token));
    },
    handleAddress: value => {
      dispatch(userActions.user.ui.address(value));
    },
    handleNoItemsInCartNotification: () => {
      dispatch(addNotification({
        title: 'No items in cart!',
        message: 'Please add a few items first',
        position: 'bl',
        status: 'warning',
      }));
    },
    handleMinimumItemsInCartNotification: () => {
      dispatch(addNotification({
        title: 'Quantity cannot go below one!',
        message: 'If you want to remove the card, press the cross button in the top right conrner',
        position: 'bl',
        status: 'warning',
      }));
    },
    handleShowNext: type => {
      switch (type) {
        case 'PHONE':
          dispatch(sidebarActions.sidebar.show.checkoutPhone());
          break;
        default:
          break;
      }
    }
  }
}

const CartContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));

export default CartContainer;
