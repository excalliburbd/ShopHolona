
export const sidebarActionCreators = {
  SIDEBAR: {
    SHOW: {
      SIGN_IN: payload => payload,
      ADD_PRODUCT: payload => payload,
      ADD_PRODUCT_STOCK: payload => payload,
      ADD_PRODUCT_IMAGES: payload => payload,
      ADD_PRODUCT_DETAILS: payload => payload,
      ADD_PRODUCT_UPLOADING: payload => payload,
      ADD_TO_CART: payload => payload,
      BACK_TO_PRODUCT_DETAILS: payload => payload,
      CHECKOUT: payload => payload,
    },
    UI: {
      SET: {
        RADIO_VALUE: payload => payload
      }
    },
    HIDE: payload => payload,
  }
}
