
export const productsReducer = (
  state = [

  ] , action
) => {
  switch (action.type) {
    case 'SET_PRODUCTS_ENTITIES':
      const products = state;

      action.payload.forEach(
        product => {
          if(products.indexOf(product.id) === -1) {
            products.unshift(product.id)
          }
        }
      )

      return products;
    default:
      return state;
  }
}

export const ProductsUIReducer = (
  state = {
    category: '',
    subCategory: '',
    subSubCategory: '',
    name: '',
    weight: '',
    price: '',
    description: '',
    selectedVariance: 0,
    selectedProduct: {}
  }, action
) => {
  switch(action.type) {
    case 'SET_UI_PRODUCT_ADD_CATEGORY':
      return {
        ...state,
        category: action.payload.value,
      }
    case 'SET_UI_PRODUCT_ADD_SUB_CATEGORY':
      return {
        ...state,
        subCategory: action.payload.value,
      }
    case 'SET_UI_PRODUCT_ADD_SUB_SUB_CATEGORY':
      return {
        ...state,
        subSubCategory: action.payload.value,
      }
    case 'SET_UI_PRODUCT_ADD_NAME':
      return {
        ...state,
        name: action.payload.value,
      }
    case 'SET_UI_PRODUCT_ADD_WEIGHT':
     return {
        ...state,
        weight: action.payload.value,
      }
    case 'SET_UI_PRODUCT_ADD_PRICE':
      return {
        ...state,
        price: action.payload.value,
      }
    case 'SET_UI_PRODUCT_ADD_DESC':
      return {
        ...state,
        description: action.payload.value,
      }
    case "SHOW_SIDEBAR_PRODUCT_DETAILS":
      return {
        ...state,
        selectedProduct: action.payload.product,
      }
    case 'SET_UI_PRODUCT_DETAILS_NAME':
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          name: action.payload.value,
        }
      }
    case 'SET_UI_PRODUCT_DETAILS_WEIGHT':
     return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          weight: action.payload.value,
        }
      }
    case 'SET_UI_PRODUCT_DETAILS_PRICE':
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          price: action.payload.value,
        }
      }
    case 'SET_UI_PRODUCT_DETAILS_DESC':
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          short_desc: action.payload.value,
        }
      }
    case 'SHOW_SIDEBAR_PRODUCT_DETAILS_DETAILS':
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          details: action.payload.value,
        }
      }
    case 'SET_UI_PRODUCT_SELECTED_VARIANCE':
      return {
        ...state,
        selectedVariance: action.payload
      }
    case 'HIDE_SIDEBAR':
      return {
        category: '',
        subCategory: '',
        subSubCategory: '',
        name: '',
        weight: '',
        price: '',
        description: '',
        selectedVariance: 0,
        selectedProduct: {}
      }
    default:
      return state;
  }
}

export const productsEntityReducer = (
  state = {

  }, action
) => {
  switch (action.type) {
    case 'SET_PRODUCTS_ENTITIES':
      const products = {};

      action.payload.forEach(
        product => {

          products[product.id] = {
            ...product,
            weight: product.variances[0].attributes[0].weight,
            price: product.variances[0].attributes[0].price
          }
        }
      )

      return {
        ...state,
        ...products
      }
    default:
      return state;
  }
}
