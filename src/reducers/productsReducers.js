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
      const price = Math.round(action.payload);
      let commissioned = price;

      if (price < 1000) {
        commissioned = Math.round(price/1.08);
      } else if(price < 5000) {
        commissioned = Math.round(price/1.06);
      } else if (price < 10000) {
        commissioned = Math.round(price/1.04);
      } else if (price < 20000) {
        commissioned = Math.round(price/1.02);
      } else {
        commissioned = Math.round(price/1.01);
      }

      return {
        ...state,
        price: commissioned,
        sh_price: price,
      }
  },
  [productActions.products.ui.set.add.desc]: (state, action) => {
    return {
      ...state,
      description: action.payload,
    }
  },
  [sidebarActions.sidebar.show.addProductDetails]: (state, action) => {
    const allAttr = action.payload.variances.map(
                        variance => {
                          return {
                            ...variance,
                            attributes: action.payload.category.secondary_attr.map(
                                            attribute => {

                                              const found = variance.attributes.find(
                                                attr => attr.type.id === attribute.id
                                              );

                                              if (found) {
                                                return {
                                                  ...found,
                                                  edited: false,
                                                  attrType: 'old',
                                                }
                                              }

                                              return {
                                                type: attribute,
                                                description: '',
                                                weight: action.payload.weight,
                                                price: action.payload.price,
                                                sh_price: action.payload.sh_price,
                                                stock: '',
                                                edited: false,
                                                attrType: 'new',
                                              }
                                            }
                                        ),
                            edited: false,
                          }
                        }
                      );
      return {
        ...state,
        selectedProduct: {
          ...action.payload,
          price: action.payload.price,
          sh_price: action.payload.sh_price,
          editing: [],
          variances: allAttr,
        },
      }
  },
  [productActions.products.ui.set.editing]: (state, action) => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          editing: action.payload,

        }
      }
  },
  [productActions.products.ui.set.edit.name]: (state, action) => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          name: action.payload,
          editing: (state.selectedProduct.editing.indexOf('name') === -1 ) ?
                    [ ...state.selectedProduct.editing, 'name' ]:
                    state.selectedProduct.editing,
        }
      }
  },
  [productActions.products.ui.set.edit.weight]: (state, action) => {
     return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          weight: action.payload,
          editing: (state.selectedProduct.editing.indexOf('price_weight') === -1 ) ?
                    [ ...state.selectedProduct.editing, 'price_weight' ]:
                    state.selectedProduct.editing,
        }
      }
  },
  [productActions.products.ui.set.edit.price]: (state, action) => {
      let price = Math.round(action.payload);
      let commissioned = price;

      if (price < 1000) {
        price = Math.round(price/1.06);
      } else if(price < 5000) {
        price = Math.round(price/1.04);
      } else if (price < 10000) {
        price = Math.round(price/1.03);
      } else if (price < 20000) {
        price = Math.round(price/1.02);
      } else {
        price = Math.round(price/1.01);
      }

      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          price: commissioned,
          sh_price: price,
          editing: (state.selectedProduct.editing.indexOf('price_weight') === -1 ) ?
                    [ ...state.selectedProduct.editing, 'price_weight' ]:
                    state.selectedProduct.editing,
        }
      }
  },
  [productActions.products.ui.set.edit.desc]: (state, action) => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          short_desc: action.payload,
          editing: (state.selectedProduct.editing.indexOf('desc') === -1 ) ?
                    [ ...state.selectedProduct.editing, 'desc' ]:
                    state.selectedProduct.editing,
        }
      }
  },
  [productActions.products.ui.set.edit.image]: (state, action) => {
    const {
      response,
      id,
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
                ],
                imgEdit: true,
              }
            }
            return variance;
          }
        ),
        editing: (state.selectedProduct.editing.indexOf('image') === -1 ) ?
                    [ ...state.selectedProduct.editing, 'image' ]:
                    state.selectedProduct.editing,
      }
    }
  },
  [productActions.products.ui.set.edit.stock]: (state, action) => {

    let editType = 'stock';

    return {
      ...state,
      selectedProduct:{
        ...state.selectedProduct,
        variances: state.selectedProduct.variances.map(
          (variance, key) => {
            if ( action.payload.variantKey === key) {
              return {
                ...variance,
                attributes: variance.attributes.map(
                  (attr, key) => {
                    if (action.payload.attributeKey === key) {
                      if (attr.attrType === 'old') {
                        editType = 'old_stock';
                      }
                      if (attr.attrType === 'new') {
                        editType = 'new_stock';
                      }
                      return {
                        ...attr,
                        stock: action.payload.value,
                        edited: true,
                      }
                    }
                    return attr;
                  }
                )
              }
            }
            return variance;
          }
        ),
        editing: (state.selectedProduct.editing.indexOf(editType) === -1 ) ?
                    [ ...state.selectedProduct.editing, editType ]:
                    state.selectedProduct.editing,
      }
    }
  },
  [productActions.products.ui.set.variance]: (state, action) => {
      if (state.selectedVariance === action.payload) {
        return {
          ...state,
          selectedVariance: -1
        }
      }

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
        sh_price: '',
        description: '',
        selectedVariance: -1,
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
        sh_price: '',
        description: '',
        selectedVariance: -1,
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
        sh_price: '',
        description: '',
        selectedVariance: -1,
        selectedProduct: {},
        pricingInfo: false,
  }),
  [productActions.products.ui.reset.categories]: (state, action) => {
      return {
        category: '',
        subCategory: '',
        subSubCategory: '',
        name: '',
        weight: '',
        price: '',
        sh_price: '',
        description: '',
        selectedVariance: -1,
        selectedProduct: {},
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
                imgEdit: true,
                images: variance.images.filter( (image, iKey) => action.payload.imageKey !== iKey)
              }
            }
            return variance;
          }
        ),
        editing: (state.selectedProduct.editing.indexOf('image') === -1 ) ?
                    [ ...state.selectedProduct.editing, 'image' ]:
                    state.selectedProduct.editing,
      }
    }
  },
  [productActions.products.ui.toggle.info]: (state, action) => {
    return {
      ...state,
      pricingInfo: !state.pricingInfo,
    }
  }
}, {
  category: '',
  subCategory: '',
  subSubCategory: '',
  name: '',
  weight: '',
  price: '',
  sh_price: '',
  description: '',
  selectedVariance: -1,
  selectedProduct: {},
  pricingInfo: false,
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
              sh_price: product.variances[0].attributes[0].sh_price,
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
              sh_price: product.variances[0].attributes[0].sh_price,
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
    },
    [productActions.products.ui.set.name]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          name: action.payload.name,
        }
      }
    },
    [productActions.products.ui.set.desc]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          short_desc: action.payload.desc,
        }
      }
    },
    [productActions.products.ui.set.attrbute]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          variances: state[action.payload.id].map(
            variant => {
              if (variant.id === action.payload.variantID) {
                return variant.attributes.map(
                  attr => {
                    if (attr.id === action.payload.attrID) {
                      return {
                        ...attr,
                        ...action.payload.attr,
                      }
                    }
                    return attr;
                  }
                )
              }
              return variant
            }
          )
        }
      }
    },
    [productActions.products.ui.set.variant]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          variances: state[action.payload.id].map(
            variant => {
              if (variant.id === action.payload.variantID) {
                return {
                  ...variant,
                  ...action.payload.variant
                }
              }
              return variant
            }
          )
        }
      }
    },
}, {

});
