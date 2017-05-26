export const SidebarUIReducer = (
  state = {
    show: false,
    type: null,
    subType: null,
    radio: 'NONE'
  }, action
) => {
  switch (action.type) {
    case 'SHOW_SIDEBAR_SIGNIN':
      return {
        ...state,
        show: true,
        type: 'SIGNIN'
      }
    case 'SHOW_SIDEBAR_ADD_PRODUCT':
      return {
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'ADD_PRODUCT'
      }
    case 'SHOW_SIDEBAR_ADD_PRODUCT_STOCK':
      return {
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'ADD_PRODUCT_STOCK'
      }
    case 'SHOW_SIDEBAR_ADD_PRODUCT_IMAGES':
      return {
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'ADD_PRODUCT_IMAGES'
      }
    case 'SHOW_SIDEBAR_PRODUCT_DETAILS':
      return {
        ...state,
        show: true,
        type: 'PRODUCT',
        subType: 'SHOW_PRODUCT_DETAILS'
      }
    case 'SHOW_SIDEBAR_ADD_PRODUCT_UPLOADING':
      return {
          ...state,
          show: true,
          type: 'PRODUCT',
          subType: 'UPLOADING'
        }
    case 'HIDE_SIDEBAR':
      return {
        ...state,
        show: false,
        type: null,
        subType: null,
        radio: 'NONE'
      }
    case 'SET_SIDEBAR_UI_RADIO_VALUE':
      return {
        ...state,
        radio: action.payload
      }
    default:
      return state;
  }
}
