import { createSelector } from 'reselect';
import moment from 'moment';

import { getProducts, getCategoriesEntities } from '../selectors/shopSelectors';
import { getAllProducts } from '../selectors/productSelectors';

export const getTabIndex = state => state.ui.backOffice.selectedIndexs;

export const getMenu = createSelector(
  [getAllProducts],
  (products) => {
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
  ({ products }, categoryObj) => {
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
              ]
            }
          }
      )
    }
  }
);
