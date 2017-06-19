import { handleActions } from 'redux-actions';

import {
  productActions,
  sidebarActions,
} from '../actions/';

export const productsReducer = handleActions({
  [productActions.products.done.get.products]: (state, action) => {
      const products = state;

      action.payload.forEach(
        product => {
          if(products.indexOf(product.id) === -1) {
            products.unshift(product.id)
          }
        }
      )

      return products;
  },
  [productActions.products.done.delete.product]: (state, action) => {
      return state.filter( id => (id !== action.payload));
  }
}, [

]);

export const featuredProductsReducer = handleActions({
  [productActions.products.done.get.featuredProducts]: (state, action) => {
      const products = state;

      action.payload.forEach(
        ({ product }) => {
          if(products.indexOf(product.id) === -1) {
            products.unshift(product.id)
          }
        }
      )

      return products;
    },
    [productActions.products.done.delete.product]: (state, action) => {
      return state.filter( id => (id !== action.payload));
    },
    [productActions.products.done.delete.featuredProduct]: (state, action) => {
      return state.filter( id => (id !== action.payload));
    }
}, [

]);

export const ProductsUIReducer = handleActions({
  [productActions.products.ui.set.add.category]: (state, action) => {
    return {
      ...state,
      category: action.payload,
    }
  },
  [productActions.products.ui.set.add.subCategory]: (state, action) => {
    return {
      ...state,
      subCategory: action.payload,
    }
  },
  [productActions.products.ui.set.add.subSubCategory]: (state, action) => {
    return {
      ...state,
      subSubCategory: action.payload,
    }
  },
  [productActions.products.ui.set.add.name]: (state, action) => {
    return {
      ...state,
      name: action.payload,
    }
  },
  [productActions.products.ui.set.add.weight]: (state, action) => {
    return {
      ...state,
      weight: action.payload,
    }
  },
  [productActions.products.ui.set.add.price]: (state, action) => {
    return {
      ...state,
      price: action.payload,
    }
  },
  [productActions.products.ui.set.add.desc]: (state, action) => {
    return {
      ...state,
      description: action.payload,
    }
  },
  [sidebarActions.sidebar.show.addProductDetails]: (state, action) => {
      return {
        ...state,
        selectedProduct: action.payload,
      }
  },
  [productActions.products.ui.set.edit.name]: (state, action) => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          name: action.payload,
        }
      }
  },
  [productActions.products.ui.set.edit.weight]: (state, action) => {
     return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          weight: action.payload,
        }
      }
  },
  [productActions.products.ui.set.edit.price]: (state, action) => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          price: action.payload,
        }
      }
  },
  [productActions.products.ui.set.edit.desc]: (state, action) => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          short_desc: action.payload,
        }
      }
  },
  // [productActions.products.ui.set.add.subSubCategory]: (state, action) => {
  //   case 'SHOW_SIDEBAR_PRODUCT_DETAILS_DETAILS':
  //     return {
  //       ...state,
  //       selectedProduct: {
  //         ...state.selectedProduct,
  //         details: action.payload.value,
  //       }
  //     }
  // },
  [productActions.products.ui.set.variance]: (state, action) => {
      return {
        ...state,
        selectedVariance: action.payload
      }
  },
  [productActions.products.ui.reset.subSubCategories]: (state, action) => {
      return {
        ...state,
        subSubCategory: '',
        name: '',
        weight: '',
        price: '',
        description: '',
        selectedVariance: 0,
        selectedProduct: {},
      }
  },
  [productActions.products.ui.reset.subCategories]: (state, action) => {
      return {
        ...state,
        subCategory: '',
        subSubCategory: '',
        name: '',
        weight: '',
        price: '',
        description: '',
        selectedVariance: 0,
        selectedProduct: {},
      }
  },
  [sidebarActions.sidebar.hide]: (state, action) => ({
        category: '',
        subCategory: '',
        subSubCategory: '',
        name: '',
        weight: '',
        price: '',
        description: '',
        selectedVariance: 0,
        selectedProduct: {},
  }),
  [productActions.products.ui.reset.categories]: (state, action) => {
      return {
        category: '',
        subCategory: '',
        subSubCategory: '',
        name: '',
        weight: '',
        price: '',
        description: '',
        selectedVariance: 0,
        selectedProduct: {},
      }
  },
  [productActions.products.ui.set.edit.image]: (state, action) => {
    const {
      response,
      id,
      image
    } = action.payload;

    return {
      ...state,
      selectedProduct:{
        ...state.selectedProduct,
        variances: state.selectedProduct.variances.map(
          (variance, key) => {
            if ( id === key) {
              return {
                ...variance,
                images: [
                  ...variance.images,
                  response
                ]
              }
            }
            return variance;
          }
        )
      }
    }
  },
  [productActions.products.ui.set.delete.image]: (state, action) => {
    return {
      ...state,
      selectedProduct:{
        ...state.selectedProduct,
        variances: state.selectedProduct.variances.map(
          (variance, key) => {
            if ( action.payload.variantKey === key) {
              return {
                ...variance,
                images: variance.images.filter( (image, iKey) => action.payload.imageKey !== iKey)
              }
            }
            return variance;
          }
        )
      }
    }
  },
}, {
  category: '',
  subCategory: '',
  subSubCategory: '',
  name: '',
  weight: '',
  price: '',
  description: '',
  selectedVariance: 0,
  selectedProduct: {},
});

export const productsEntityReducer = handleActions({
    [productActions.products.done.get.products]: (state, action) => {
      const products = {
        ...state
      }

      action.payload.forEach(
        product => {
          if (products[product.id]) {
            products[product.id] = {
              ...products[product.id],
              ...product,
            }
          } else {
            products[product.id] = {
              ...product,
              weight: product.variances[0].attributes[0].weight,
              price: product.variances[0].attributes[0].price,
              selectedVariant: 0,
              selectedAttribute: 0,
            }
          }
        }
      )

      return products;
    },
    [productActions.products.done.delete.product]: (state, action) => {
      const productsEntity = { ...state };

      delete productsEntity[action.payload];

      return productsEntity;
    },
    [productActions.products.done.get.featuredProducts]: (state, action) => {
      const featuredProducts = {
        ...state
      }

      action.payload.forEach(
        ({ id, product }) => {
          if (featuredProducts[product.id]) {
            featuredProducts[product.id] = {
              ...featuredProducts[product.id],
              ...product,
              featuredID: id,
            }
          } else {
            featuredProducts[product.id] = {
              ...product,
              featuredID: id,
              weight: product.variances[0].attributes[0].weight,
              price: product.variances[0].attributes[0].price,
              selectedVariant: 0,
              selectedAttribute: 0,
            }
          }
        }
      )

      return featuredProducts;
    },
    [productActions.products.done.delete.featuredProducts]: (state, action) => {
      const featuredProductsEntity = { ...state };

      delete featuredProductsEntity[action.payload];

      return featuredProductsEntity;
    },
    [productActions.products.ui.set.productVariance]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          selectedVariant: action.payload.key,
        }
      }
    },
    [productActions.products.ui.set.productAttribute]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          selectedAttribute: action.payload.key,
        }
      }
    }
}, {

});
