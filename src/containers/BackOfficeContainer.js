import { connect } from 'react-redux';


import BackOffice from '../components/BackOffice/BackOffice';

import { sidebarActions, backOfficeActions } from '../actions/';

import { getVendor } from '../selectors/userSelectors';
import {
  getMenu,
  getTabIndex,
  getTablistData,
  getallOrders,
} from '../selectors/backOfficeSelectors';


const mapStateToProps = state => {
  return {
    menu: getMenu(state),
    tabIndex: getTabIndex(state),
    data: getTablistData(state),
    vendor: getVendor(state),
    orders: getallOrders(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleTabChange: (index, route) => {
      dispatch(backOfficeActions.backOffice.set.tab({
        index,
        route: route,
      }));
    },
    setOrderStatus: (value, id) => {
      // dispatch({
      //   type: 'UPDATE_ORDERS_DATA_STATUS',
      //   value,
      //   id
      // }) dun work brah
    },
    handleShowProductDetails: (vendor, product) => {
      if (vendor) {
        dispatch(sidebarActions.sidebar.show.addProductDetails(product));
      }
    },
    handleShowOrderDetails: id => {
      dispatch(sidebarActions.sidebar.show.orderDetails(id));
    }
  }
}

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(BackOffice);

export default FilterBarContainer;
