import { connect } from 'react-redux';

import { getTotal, getCartItems } from '../selectors/cartSelectors';
import { getToken, getUserAddresses } from '../selectors/userSelectors';

import { mapStateToAddressProps, mapDispatchToAddressProps } from './SettingsContainer';

import Checkout from '../components/Cart/Checkout';

const mapStateToProps = state => {
  return {
    cartItems: getCartItems(state),
    total: getTotal(state),
    sidebarType: state.ui.sidebar.subType,
    addresses: getUserAddresses(state),
    token: getToken(state),
    ...mapStateToAddressProps(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...mapDispatchToAddressProps(dispatch),
  }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default CheckoutContainer;
