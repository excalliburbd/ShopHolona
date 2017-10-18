import { connect } from 'react-redux';

import { getTotal, getCartItems } from '../selectors/cartSelectors';
import { getToken, getUserAddresses } from '../selectors/userSelectors';

import { mapStateToAddressProps, mapDispatchToAddressProps } from './SettingsContainer';

import {
  sidebarActions,
  paymentandaddressActions,
} from '../actions/';

import {
  postUserAddress,
} from '../thunks/userThunks';

import Checkout from '../components/Cart/Checkout';

const mapStateToProps = state => {
  return {
    cartItems: getCartItems(state),
    total: getTotal(state),
    sidebarType: state.ui.sidebar.subType,
    addresses: getUserAddresses(state),
    token: getToken(state),
    ...mapStateToAddressProps(state),
    slectedAddress: state.ui.paymentsAndAddresses.selectedCheckoutAddress,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...mapDispatchToAddressProps(dispatch),
    handleShowCheckoutAddress: () => {
      dispatch(sidebarActions.sidebar.show.checkoutAddress());

      // dispatch(sidebarActions.sidebar.show.checkoutFinalizeOrder());
    },
    handleAddressAndShowNext: (city, thana, title, details, primary, token) => {
      console.log(city, thana, title, details, primary, token)
      if (city && thana) {
        dispatch(postUserAddress(city, thana, title, details, primary, token, sidebarActions.sidebar.show.checkoutPaymentSelection()));
      }
    },
    handleSetSelectedAddress: key => {
      dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.selectedCheckoutAddress(key));
    }
  }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default CheckoutContainer;
