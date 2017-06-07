import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import moment from 'moment';

import BackOffice from '../components/BackOffice/BackOffice';

import { sidebarActions } from '../actions/';

import { getProducts, getCategoriesEntities, getVendors } from '../selectors/shopSelectors';

const getTabIndex = state => state.ui.backOffice.selectedIndexs;
const getOrdersArray = state => state.orders;
const getOrdersObj = state => state.entities.orders;
// const getProductsArray = state => state.products;
// const getProductsObj = state => state.entities.products;

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

const getMenu = createSelector(
  [getProducts],
  (products) => {
    return {
      products,
    }
  }
);

const getProductStatus = id => {
  switch(id) {
    case 0:
      return 'Available';
    case 1:
      return 'Out Of Stock';
    case 2:
      return 'Deleted';
    case 3:
      return "Pending";
    case 4:
      return "Denied";
    case 5:
      return "Archived";
    default:
      return 'Pending';
  }
}

const getTablistData = createSelector(
  [getProducts, getCategoriesEntities],
  (products, categoryObj) => {
    return {
      products: [
        ['Image', 'No.', 'Name', 'Category', 'Date', 'Price', 'Stock', 'Status'],
        ...products.map(
            category => {
              return category.products.map(
                  product => {
                  return ['Image', 'No.', 'Name', 'Category', 'Date', 'Price', 'Stock', 'Status']
                        .map(
                          field => {
                            switch(field) {
                              case 'Image':
                                return {
                                  field,
                                  value: (product.variances && product.variances[0].images[0]) ?
                                  product.variances[0].images[0].image : 'https://unsplash.it/480/480'
                                }
                              case 'No.':
                                return {
                                  field,
                                  value: product.id
                                }
                              case 'Name':
                                return {
                                  field,
                                  value: product.name
                                }
                              case 'Category':
                                return {
                                  field,
                                  value: categoryObj[product.category] && categoryObj[product.category].name
                                }
                              case 'Date':
                                return {
                                  field,
                                  value: moment(product.created_at).format('DD/MM/YYYY').toString()
                                }
                              case 'Price':
                                return {
                                  field,
                                  value: (product.variances && product.variances[0].attributes[0]) ?
                                    product.variances[0].attributes[0].price : 0
                                }
                              case 'Stock':
                                return {
                                  field,
                                  value: (product.variances && product.variances[0].attributes) ?
                                    product.variances[0].attributes
                                      .reduce(
                                        (acc, curr) => (acc + curr.stock)
                                        , 0
                                      ) : 0
                                }
                              case 'Status':
                                return {
                                  field,
                                  value: getProductStatus(product.status)
                                }
                              default:
                                return {
                                  field,
                                  value: 'N/A'
                                }
                            }
                          }
                        )
                  }
                )
            }
          )
      ]
    }
  }
)

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
