
export const cartActionCreators = {
  CART: {
    ADD: {
      ITEM: payload => payload,
    },
    DONE: {
      GET: payload => payload,
      DELETE: payload => payload,
    },
    UPDATE: {
      ITEM: payload => payload,
      ITEM_BY_VARIANT: payload => payload,
    },
    SET:{
      LOADING: payload => payload,
      INVOICE_NUMBER: payload => payload,
    },
    UNDO: {
      DELETE: payload => payload,
    },
    ERROR: payload => payload,
    HIDE: payload => payload,
  }
}
