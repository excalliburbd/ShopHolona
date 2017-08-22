import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Settings from '../components/BackOffice/Settings';

import {
  shopActions,
  paymentandaddressActions,
  imageUploaderActions,
} from '../actions/';

import {
  getShopID,
  getShopInfo,
} from '../selectors/shopSelectors';
import { getVendor, getToken } from '../selectors/userSelectors';
import {
  getIsFcom,
  getIsPhysicalStore,
} from '../selectors/shopSelectors';
import {
  getAllbanks,
  getAllBranches,
  getAllbankInfo,
  getFusedDistricts,
  getFusedCities,
  getFusedThanas,
} from '../selectors/paymentandaddressSelectors';

import {
  runShopInfoUpdate
} from '../thunks/shopThunks';
import {
  getBranch,
  saveBankInfo,
  getCities,
  getThanas,
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
    physicalStore: getIsPhysicalStore(state),
    districts: getFusedDistricts(state),
    districtUIValue: state.ui.paymentsAndAddresses.district,
    districtUIID: state.ui.paymentsAndAddresses.districtID,
    cities: getFusedCities(state),
    cityUIValue: state.ui.paymentsAndAddresses.city,
    cityUIID: state.ui.paymentsAndAddresses.cityID,
    thanas: getFusedThanas(state),
    thanaUIValue: state.ui.paymentsAndAddresses.thana,
    thanaUIID: state.ui.paymentsAndAddresses.thanaID,
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
        case 'district':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.district(value));
          break;
        case 'city':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.city(value));
          break;
        case 'thana':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.thana(value));
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
        case 'district':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.districtId(value));
          dispatch(getCities(value));
          break;
        case 'city':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.cityId(value));
          dispatch(getThanas(value));
          break;
        case 'thana':
          dispatch(paymentandaddressActions.paymentsAndAddresses.ui.set.thanaId(value));
          break;
        default:
          break;
      }
    },
    postBankInfo: (bank, branch, accountName, accountNumber, shop, token) => {
      dispatch(saveBankInfo(bank, branch, accountName, accountNumber, shop, token));
    },
    handleShowImageUploader: () => {
      dispatch(imageUploaderActions.imageUploader.show.uploader('TIN'));
    },
    editSocial: (type, value) => {
      dispatch(shopActions.shop.edit.social({type, value}));
    }
  }
}

const SettingsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));

export default SettingsContainer;
