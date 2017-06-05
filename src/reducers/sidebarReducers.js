import { handleActions } from 'redux-actions';

import { sidebarActions } from '../actions/';

export const SidebarUIReducer = handleActions({
    [sidebarActions.sidebar.show.signIn]: (state, action) => ({
        ...state,
        show: true,
        type: 'SIGNIN'
      }),
    [sidebarActions.sidebar.show.addProduct]: (state, action) => ({
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'ADD_PRODUCT'
      }),
    [sidebarActions.sidebar.show.addProductStock]: (state, action) => ({
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'ADD_PRODUCT_STOCK'
      }),
    [sidebarActions.sidebar.show.addProductImages]: (state, action) => ({
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'ADD_PRODUCT_IMAGES'
      }),
    [sidebarActions.sidebar.show.addProductDetails]: (state, action) => ({
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'SHOW_PRODUCT_DETAILS'
      }),

    ['SHOW_SIDEBAR_CART_CHOOSE']: (state, action) => ({
       ...state,
        show: true,
        type: 'CART',
        subType: 'CART_CHOOSE_PRODUCT'
    }),

    [sidebarActions.sidebar.show.addProductUploading]: (state, action) => ({
          ...state,
          show: true,
          type: 'PRODUCT',
          subType: 'UPLOADING'
        }),
    [sidebarActions.sidebar.hide]: (state, action) => ({
        ...state,
        show: false,
        type: null,
        subType: null,
        radio: 'NONE'
      }),
    [sidebarActions.sidebar.ui.set.radioValue]: (state, action) => ({
        ...state,
        radio: action.payload
      })
}, {
  show: false,
  type: null,
  subType: null,
  radio: 'NONE'
})
