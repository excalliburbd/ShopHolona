
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
      CHECKOUT_ADDRESS: payload => payload,
      CHECKOUT_PHONE: payload => payload,
      CHECKOUT_VERIFY_PHONE: payload => payload,
      CHECKOUT_PAYMENT_SELECTION: payload => payload,
      CHECKOUT_FINALIZE_ORDER: payload => payload,
    },
    UI: {
      SET: {
        RADIO_VALUE: payload => payload
      }
    },
    HIDE: payload => payload,
  }
}
