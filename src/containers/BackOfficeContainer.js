import { connect } from 'react-redux';


import BackOffice from '../components/BackOffice/BackOffice';

import { sidebarActions } from '../actions/';

import { getVendors } from '../selectors/shopSelectors';
import {
  getMenu,
  getTabIndex,
  getTablistData,
} from '../selectors/backOfficeSelectors';


const mapStateToProps = state => {
  return {
    menu: getMenu(state),
    tabIndex: getTabIndex(state),
    data: getTablistData(state),
    vendor: getVendors(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleTabChange: (index, route) => {
      dispatch({
        type: 'CHANGE_UI_TAB',
        index,
        route: route,
      })
    },
    setOrderStatus: (value, id) => {
      dispatch({
        type: 'UPDATE_ORDERS_DATA_STATUS',
        value,
        id
      })
    },
    handleShowProductDetails: (vendor, product) => {
      if (vendor) {
        dispatch(sidebarActions.sidebar.show.addProductDetails(product));
      }
    },
  }
}

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(BackOffice);

export default FilterBarContainer;
