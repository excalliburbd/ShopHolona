import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import BackOffice from '../components/BackOffice';

const getMenu = state => state.ui.backOffice.menu;
const getTabIndex = state => state.ui.backOffice.selectedIndexs;
const getOrdersArray = state => state.orders;
const getOrdersObj = state => state.entities.orders;

const getAllOrders = createSelector(
  [getOrdersArray, getOrdersObj],
  (ordersArr, ordersObj) => {
    return ordersArr.map(
      id => ({
       orderID: id,
       orderArr: ordersObj[id],
      })
    )
  }
);

const getFilteredOrders = createSelector(
  [getAllOrders, getMenu],
  (orders, menu) => menu.orders.slice(1).map(
    ({ value }) => orders.filter( order => (value === order.orderArr[order.orderArr.length -1].value))
  )
)

const mapStateToProps = state => {
  return {
    menu: getMenu(state),
    tabIndex: getTabIndex(state),
    data: {
      orders: [
        getAllOrders(state),
        ...getFilteredOrders(state),
      ]
    },
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleTabChange: (index, route) => {
      dispatch({
        type: 'CHANGE_UI_TAB',
        index,
        route,
      })
    },
    setOrderStatus: (value, id) => {
      dispatch({
        type: 'UPDATE_ORDERS_DATA_STATUS',
        value,
        id
      })
    }
  }
}

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(BackOffice);

export default FilterBarContainer;
