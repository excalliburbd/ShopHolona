import { connect } from 'react-redux';

import { getTotal, getCartItems } from '../selectors/cartSelectors';

import Checkout from '../components/Cart/Checkout';

const mapStateToProps = state => {
  return {
    cartItems: getCartItems(state),
    total: getTotal(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default CheckoutContainer;
