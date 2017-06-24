import { handleActions } from 'redux-actions';

import { sidebarActions } from '../actions/';

export const SidebarUIReducer = handleActions({
    [sidebarActions.sidebar.show.signIn]: (state, action) => ({
        ...state,
        show: true,
        type: 'SIGNIN',
        titleMsg: 'Sign In'
      }),
    [sidebarActions.sidebar.show.addProduct]: (state, action) => ({
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'ADD_PRODUCT',
        titleMsg: 'Add Product',
      }),
    [sidebarActions.sidebar.show.addProductStock]: (state, action) => ({
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'ADD_PRODUCT_STOCK',
        titleMsg: 'Add Product Stock'
      }),
    [sidebarActions.sidebar.show.addProductImages]: (state, action) => ({
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'ADD_PRODUCT_IMAGES',
        titleMsg: 'Add Product Images'
      }),
    [sidebarActions.sidebar.show.backToProductDetails]: (state, action) => ({
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'SHOW_PRODUCT_DETAILS',
        titleMsg: 'Edit Product'
      }),
    [sidebarActions.sidebar.show.addProductDetails]: (state, action) => ({
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'SHOW_PRODUCT_DETAILS',
        titleMsg: 'Edit Product'
      }),
    [sidebarActions.sidebar.show.addToCart]: (state, action) => ({
       ...state,
        show: true,
        type: 'CART',
        subType: 'CART_CHOOSE_PRODUCT',
        titleMsg: 'Shopping Cart'
    }),
    [sidebarActions.sidebar.show.checkout]: (state, action) => ({
       ...state,
        show: true,
        type: 'CART',
        subType: 'CHECKOUT',
        titleMsg: 'Shopping Cart'
    }),
    [sidebarActions.sidebar.show.addProductUploading]: (state, action) => ({
          ...state,
          show: true,
          type: 'PRODUCT',
          subType: 'UPLOADING',
          titleMsg: 'Uploading Product'
        }),
    [sidebarActions.sidebar.hide]: (state, action) => ({
        ...state,
        show: false,
        type: null,
        subType: null,
        radio: 'NONE',
        titleMsg: '',
      }),
    [sidebarActions.sidebar.ui.set.radioValue]: (state, action) => ({
        ...state,
        radio: action.payload
      })
}, {
  show: false,
  type: null,
  subType: null,
  radio: 'PRODUCT',
  titleMsg: ''
})
