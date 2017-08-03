import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addNotification } from 'reapop';

import Settings from '../components/BackOffice/Settings';

import {
  shopActions,
  paymentandaddressActions,
  sidebarActions,
} from '../actions/';

import {
  getShopID,
  getShopInfo,
} from '../selectors/shopSelectors';
import { getVendor, getToken } from '../selectors/userSelectors';
import {
  getIsFcom
} from '../selectors/shopSelectors';
import {
  getAllbanks,
  getAllBranches,
  getAllbankInfo,
} from '../selectors/paymentandaddressSelectors';

import {
  runShopInfoUpdate
} from '../thunks/shopThunks';
import {
  getBanks,
  getBranch,
  saveBankInfo,
} from '../thunks/paymentandaddressThunks';

const mapStateToProps = state => {
  return {
    info: getShopInfo(state),
    token: getToken(state),
    shop: getShopID(state),
    fcom: getIsFcom(state),
    banks: getAllbanks(state),
    bankInfo: getAllbankInfo(state),
    bankUIValue: state.ui.paymentsAndAddresses.bank,
    branchUIValue: state.ui.paymentsAndAddresses.branch,
    bankUIID: state.ui.paymentsAndAddresses.bankID,
    branchUIID: state.ui.paymentsAndAddresses.branchID,
    branches: getAllBranches(state),
    accountNameUIValue: state.ui.paymentsAndAddresses.accountName,
    accountNumberUIValue: state.ui.paymentsAndAddresses.accountNumber,
    payments: state.shop.payments[0],
    editing: state.shop.information.editing.length > 0,
    vendor: getVendor(state),
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
      switch (type) {
        case 'bank':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.bank(value));

          break;
        case 'branch':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.branch(value));
          break;
        case 'account_name':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.account.name(value));
          break;
        case 'account_number':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.account.number(value));
          break;
        default:
          break;
      }
    },
    handleSelect: (type, value) => {
      switch (type) {
        case 'bank':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.bankId(value));
          dispatch(getBranch(value));
          break;
        case 'branch':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.branchId(value));
          break;
        default:
          break;
      }
    },
    postBankInfo: (bank, branch, accountName, accountNumber, shop, token) => {
      dispatch(saveBankInfo(bank, branch, accountName, accountNumber, shop, token));
    },
    loadData: () => {
      getBanks();
    },
    logInToGetBanks: () => {
      dispatch(addNotification({
                title: 'info',
                message: 'Please Log In again',
                position: 'bl',
                status: 'success',
              }));
      dispatch(sidebarActions.sidebar.show.signIn());
    }
  }
}

const SettingsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));

export default SettingsContainer;
