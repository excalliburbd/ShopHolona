import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Settings from '../components/BackOffice/Settings';

import { shopActions } from '../actions';

import {
  getShopName,
  getShopDomain,
  getAddress,
  getHours,
  getTradeLicence,
} from '../selectors/shopSelectors';

const mapStateToProps = state => {
  return {
    name: getShopName(state),
    domain: getShopDomain(state),
    addresses: getAddress(state),
    hours: getHours(state),
    tradeLicence: getTradeLicence(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateValue: (value, type) => {
      dispatch(shopActions.shop.edit.name(value));
    }
  }
}

const SettingsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));

export default SettingsContainer;
