
export const productsReducer = (
  state = [

  ] , action
) => {
  switch (action.type) {
    case 'SET_PRODUCTS_ENTITIES':
      const products = [];

      action.payload.forEach(
        product => {
          if(state.indexOf(product.id) === -1) {
            products.push(product.id)
          }
        }
      )

      return [
        ...state,
        ...products,
      ]
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
  }, action
) => {
  switch(action.type) {
    case 'SET_UI_PRODUCT_CATEGORY':
      return {
        ...state,
        category: action.payload.value,
      }
    case 'SET_UI_PRODUCT_SUB_CATEGORY':
      return {
        ...state,
        subCategory: action.payload.value,
      }
    case 'SET_UI_PRODUCT_SUB_SUB_CATEGORY':
      return {
        ...state,
        subSubCategory: action.payload.value,
      }
    case 'SET_UI_PRODUCT_NAME':
      return {
        ...state,
        name: action.payload.value,
      }
    case 'SET_UI_PRODUCT_WEIGHT':
     return {
        ...state,
        weight: action.payload.value,
      }
    case 'SET_UI_PRODUCT_PRICE':
      return {
        ...state,
        price: action.payload.value,
      }
    case 'SET_UI_PRODUCT_DESC':
      return {
        ...state,
        description: action.payload.value,
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
