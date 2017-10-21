import { connect } from 'react-redux';
import { addNotification } from 'reapop';

import { getTotal, getCartItems } from '../selectors/cartSelectors';
import { getToken, getUserAddresses, getUserDetails, getGuestUserDetails } from '../selectors/userSelectors';

import { mapStateToAddressProps, mapDispatchToAddressProps } from './SettingsContainer';

import {
  sidebarActions,
  paymentandaddressActions,
} from '../actions/';

import {
  postUserAddress,
} from '../thunks/userThunks';
import {
  checkout,
} from '../thunks/checkoutThunks';

import Checkout from '../components/Cart/Checkout';

const mapStateToProps = state => {
  return {
    cartItems: getCartItems(state),
    total: getTotal(state),
    sidebarType: state.ui.sidebar.subType,
    addresses: getUserAddresses(state),
    token: getToken(state),
    selectedAddress: state.ui.paymentsAndAddresses.selectedCheckoutAddress,
    ...mapStateToAddressProps(state),
    user: getUserDetails(state),
    guestUser: getGuestUserDetails(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...mapDispatchToAddressProps(dispatch),
    handleAddressAndShowNext: (city, thana, title, details, primary, token) => {
      if (city && thana) {
        dispatch(postUserAddress(city, thana, title, details, primary, token, sidebarActions.sidebar.show.checkoutPaymentSelection()));
        dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.selectedCheckoutAddress(0));
      } else {
        dispatch(addNotification({
          title: 'Error with Checkout Address',
          message: 'Either enter your address or choose and existing address',
          position: 'bl',
          status: 'error',
        }));
      }
    },
    handleSetSelectedAddress: (key, toggle) => {
      dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.selectedCheckoutAddress( toggle ? null : key));
    },
    handleShowCheckoutAddress: () => {
      dispatch(sidebarActions.sidebar.show.checkoutAddress());
    },
    handleShowPaymentMethods: () => {
      dispatch(sidebarActions.sidebar.show.checkoutPaymentSelection());
    },
    handleShowFinalizeOrder: () => {
      dispatch(sidebarActions.sidebar.show.checkoutFinalizeOrder());
    },
    handleCheckout: (total, cart, address, token, next) => {
      dispatch(checkout(total, cart, address, token, next));
    }
  }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default CheckoutContainer;
