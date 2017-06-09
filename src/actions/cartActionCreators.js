
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
    },
    SET:{
      LOADING: payload => payload,
    },
    ERROR: payload => payload,
    HIDE: payload => payload,
  }
}
