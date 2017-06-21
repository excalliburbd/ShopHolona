
export const shopActionCreators = {
  SHOP: {
    SET: {
      SHOP:  payload => payload,
      ID:  payload => payload,
      CONTACT_NUMBER:  payload => payload,
      ADDRESS:  payload => payload,
      DETAILS_TAB: payload => payload,
      HOURS: payload => payload,
      EDITING: payload => payload,
    },
    EDIT: {
      NAME: payload => payload,
      PHONE: payload => payload,
      ADDRESS: payload => payload,
      CITY: payload => payload,
      POSTAL: payload => payload,
      FROM_HOUR: payload => payload,
      TO_HOUR: payload => payload,
      LICENSE_NUMBER: payload => payload,
    },
    TOGGLE: {
      PRODUCT_DETAILS:  payload => payload,
    },
    TOGGLE_DETAILS: payload => payload,
    UPDATE_CHIP: payload => payload,
  }
}
