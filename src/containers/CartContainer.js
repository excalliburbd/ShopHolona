import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addNotification } from 'reapop';

import {
  cartActions,
  sidebarActions,
} from '../actions/';

import { getTotal, getCartItems, getCartLoading } from '../selectors/cartSelectors';
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
    loading: getCartLoading(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCartItem: (cartID, id, quantity, token, stock) =>  {
      if (stock < quantity) {
        dispatch(addNotification({
          title: 'Stock Unavailable',
          message: 'Sorry we are all out of stock',
          position: 'bl',
          status: 'warning',
        }));
      } else {
        if (token) {
          dispatch(updateCartItem(cartID, id, quantity, token));
        } else {
          dispatch(cartActions.cart.update.item({id: cartID, quantity}))
        }
      }
    },
    deleteCartItem: (id, token) => {
      dispatch(deleteCartItem(id, token));
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
        message: 'If you want to remove the product from the cart, press the cross button in the top right conrner',
        position: 'bl',
        status: 'warning',
      }));
    },
    handleShowCheckout: token => {

      // dispatch(sidebarActions.sidebar.show.checkoutPaymentSelection());
      // dispatch(sidebarActions.sidebar.show.checkoutFinalizeOrder());
      if (token) {
        dispatch(sidebarActions.sidebar.show.checkoutAddress());
      } else {
        dispatch(sidebarActions.sidebar.show.checkoutPhone());
      }
    }
  }
}

const CartContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));

export default CartContainer;
