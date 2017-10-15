import { connect } from 'react-redux';

import { getTotal, getCartItems } from '../selectors/cartSelectors';
import { getToken, getUserAddresses } from '../selectors/userSelectors';

import Checkout from '../components/Cart/Checkout';

const mapStateToProps = state => {
  return {
    cartItems: getCartItems(state),
    total: getTotal(state),
    sidebarType: state.ui.sidebar.subType,
    addresses: getUserAddresses(state),
    token: getToken(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default CheckoutContainer;
