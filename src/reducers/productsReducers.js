
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
    case 'DONE_API_DELETE_PRODUCT':
      return state.filter( id => (id !== action.payload.id));
    default:
      return state;
  }
}

export const featuredProductsReducer = (
  state = [

  ] , action
) => {
  switch (action.type) {
    case 'DONE_API_GET_FEATURED_PRODUCT':
      const products = state;

      action.payload.forEach(
        ({ product }) => {
          if(products.indexOf(product.id) === -1) {
            products.unshift(product.id)
          }
        }
      )

      return products;
    case 'DONE_API_DELETE_PRODUCT':
    case 'DONE_API_REMOVE_FEATURED_PRODUCT':
      return state.filter( id => (id !== action.payload.productID));
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
    selectedProduct: {},
    uploadCount: 0,
    doneUploadCount: 0,
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
    case 'RESET_UI_SUB_SUB_CATEGORIES':
      return {
        ...state,
        subSubCategory: '',
        name: '',
        weight: '',
        price: '',
        description: '',
        selectedVariance: 0,
        selectedProduct: {}
      }
    case 'RESET_UI_SUB_CATEGORIES':
      return {
        ...state,
        subCategory: '',
        subSubCategory: '',
        name: '',
        weight: '',
        price: '',
        description: '',
        selectedVariance: 0,
        selectedProduct: {}
      }
    case 'HIDE_SIDEBAR':
    case 'RESET_UI_CATEGORIES':
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
    case 'SET_PRODUCTS_UPLOAD_COUNT':
      return {
        ...state,
        uploadCount: action.payload,
        doneUploadCount: 0,
      }
    case 'INC_PRODUCTS_UPLOAD_COUNT':
      return {
        ...state,
        doneUploadCount: state.doneUploadCount + 1,
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
              price: product.variances[0].attributes[0].price
            }
          }
        }
      )

      return products;
    case 'DONE_API_DELETE_PRODUCT':
      const productsEntity = { ...state };

      delete productsEntity[action.payload.id];

      return productsEntity;
    case 'DONE_API_GET_FEATURED_PRODUCT':
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
              price: product.variances[0].attributes[0].price
            }
          }
        }
      )

      return featuredProducts;
    case 'DONE_API_DELETE_FEATURED_PRODUCT':
      const featuredProductsEntity = { ...state };

      delete featuredProductsEntity[action.payload.productID];

      return featuredProductsEntity;
    default:
      return state;
  }
}
