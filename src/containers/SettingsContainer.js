import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Settings from '../components/BackOffice/Settings';

import { shopActions, paymentandaddressActions } from '../actions';

import {
  getShopID,
  getShopInfo,
} from '../selectors/shopSelectors';
import { getToken } from '../selectors/userSelectors';
import {
  getIsFcom
} from '../selectors/shopSelectors';
import {
  getAllbanks
} from '../selectors/paymentandaddressSelectors';

import {
  runShopInfoUpdate
} from '../thunks/shopThunks';

const mapStateToProps = state => {
  return {
    info: getShopInfo(state),
    token: getToken(state),
    shop: getShopID(state),
    fcom: getIsFcom(state),
    banks: getAllbanks(state),
    bankUIValue: state.ui.paymentsAndAddresses.bank,
    bankUIID: state.ui.paymentsAndAddresses.bankID,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateValue: (value, type) => {
      dispatch(shopActions.shop.edit[type](value));
    },
    postUpdates: (info, shop, token) => {
      dispatch(runShopInfoUpdate(info, shop, token));
    },
    handleSetValue: (type, value) => {
      dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.bank(value))
    },
    handleSelect: (type, value) => {
      dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.bankId(value))
    }
  }
}

const SettingsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));

export default SettingsContainer;
