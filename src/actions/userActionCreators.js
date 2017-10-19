export const userActionCreators = {
  USER: {
    UI: {
      EMAIL: payload => payload,
      EMAIL_PASSWORD: payload => payload,
      PHONE: payload => payload,
      PHONE_PASSWORD: payload => payload,
      ADDRESS: payload => payload,
      UPDATE_PHONE: payload => payload,
      SET_HAS_NUMBER: payload => payload,
    },
    DONE: {
      GET: {
        TOKEN: payload => payload,
        PROFILE: payload => payload,
        AUTH_SHOP: payload => payload,
        FOLLOWING_SHOPS: payload => payload,
        GUEST_USER: payload => payload,
      }
    },
    SET: {
      FOLLOWING_SHOP: payload => payload,
      ADDRESS: payload => payload, //todo address -rename-> addresses
      GUEST_USER_ADDRESSES: payload => payload,
    },
    DELETE: {
      FOLLOWING_SHOP: payload => payload,
    },
    MANUAL_SIGN_OUT: payload => payload
  }
}
