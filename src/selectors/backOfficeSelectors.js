import { createSelector } from 'reselect';
import moment from 'moment';

import { getCategoriesEntities } from '../selectors/shopSelectors';
import { getAllProducts } from '../selectors/productSelectors';

export const getTabIndex = state => state.ui.backOffice.selectedIndexs;
export const getOrdersArray = state => state.orders;
export const getOrders = state => state.entities.orders;

export const getallOrders = createSelector(
  [getOrdersArray, getOrders],
  (ordersArr, ordersObj) => {
    return ordersArr.map(
      id => ordersObj[id]
    );
  }
);

export const getOrderStatus = id => {
  switch(id) {
    case 0:
      return 'Completed';
    case 1:
      return 'Pending';
    case 2:
      return 'Processing';
    case 3:
      return 'Cancelled by Vendor';
    case 4:
      return 'Refund';
    case 5:
      return 'On Hold';
    case 6:
      return 'Cancelled by User';
    case 7:
      return 'Assigned to shipping';
    case 8:
      return 'Error';
    case 9:
      return 'Picked up for delivery';
    case 10:
      return 'Awaiting payment';
    default:
      return 'Pending';
  }
}

export const getMenu = createSelector(
  [getAllProducts, getallOrders],
  (products, orders) => {
    return {
      products: [
        {
          name: 'All',
          items: products,
        },
        ...['Available', 'Out Of Stock', 'Deleted', "Pending", "Denied", "Archived"]
          .map(
            (name, key) => ({
              name,
              items: products.filter( ({ status }) => ((status === key)))
            })
          )
      ],
      orders: [
        {
          name: 'All',
          items: orders,
        },
        ...['Completed', 'Pending', 'Processing', 'Cancelled', 'Refund', 'On Hold' ]
          .map(
            (name, key) => ({
              name,
              items: orders.filter( ({ order_status }) => {
                const statusString = getOrderStatus(order_status);

                if ((order_status === 3 || order_status === 6) && name === 'Cancelled') {
                  return true;
                }

                return name === statusString;
              })
            })
          )
      ]
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

export const getTablistData = createSelector(
  [getMenu, getCategoriesEntities],
  ({ products, orders }, categoryObj) => {
    return {
      products: products.map(
        ({ items }) => {
          return {
            maping: ['Image', 'No.', 'Name', 'Category', 'Date', 'Price', 'Stock', 'Status'],
            content: [
              ...items.map(
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
                                      product.variances[0].attributes[0].sh_price : 0
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
              ]
            }
          }
      ),
      orders: orders.map(
        ({ items }) => {
            return {
              maping: ['User', 'No.', 'Due Date', 'Total Price', 'Total Weight', 'Address','Status'],
              content: [
                ...items.map(
                  order => {
                    return ['User', 'No.', 'Due Date', 'Total Price', 'Total Weight', 'Address','Status']
                            .map(
                              field => {
                                switch(field) {
                                  case 'User':
                                    return {
                                      field,
                                      value: order.user.full_name,
                                    }
                                  case 'No.':
                                    return {
                                      field,
                                      value: order.id
                                    }
                                  case 'Due Date':
                                    return {
                                      field,
                                      value: moment(order.created_at).add(7, 'days').format('DD/MM/YYYY').toString()
                                    }
                                  case 'Total Price':
                                    return {
                                      field,
                                      value: order.total_price
                                    }
                                  case 'Total Weight':
                                    return {
                                      field,
                                      value: order.total_weight
                                    }
                                  case 'Address':
                                    return {
                                      field,
                                      value: order.to_address.details
                                    }
                                  case 'Status':
                                    return {
                                      field,
                                      value: getOrderStatus(order.order_status)
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
              ]
            }
        }
      )
    }
  }
);
