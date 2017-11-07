import {
  handleActions
} from 'redux-actions';

import {
  sidebarActions
} from '../actions/';

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
    titleMsg: 'Your Cart'
  }),
  [sidebarActions.sidebar.show.checkout]: (state, action) => ({
    ...state,
    show: true,
    type: 'CHECKOUT',
    subType: 'CHECKOUT',
    titleMsg: 'Checkout'
  }),
  [sidebarActions.sidebar.show.checkoutAddress]: (state, action) => ({
    ...state,
    show: true,
    type: 'CHECKOUT',
    subType: 'ADDRESS',
    titleMsg: 'Checkout'
  }),
  [sidebarActions.sidebar.show.checkoutPhone]: (state, action) => ({
    ...state,
     show: true,
     type: 'CHECKOUT',
     subType: 'PHONE',
     titleMsg: 'Checkout'
  }),
  [sidebarActions.sidebar.show.checkoutVerifyPhone]: (state, action) => ({
    ...state,
    show: true,
    type: 'CHECKOUT',
    subType: 'VERIFY_PHONE',
    titleMsg: 'Checkout'
  }),
  [sidebarActions.sidebar.show.checkoutPaymentSelection]: (state, action) => ({
    ...state,
    type: 'CHECKOUT',
    subType: 'PAYMENT_SELECTION',
    titleMsg: 'Checkout'
  }),
  [sidebarActions.sidebar.show.checkoutFinalizeOrder]: (state, action) => ({
    ...state,
    type: 'CHECKOUT',
    subType: 'FINALIZE_ORDER',
    titleMsg: 'Checkout'
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
    radio: 'PRODUCT',
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
