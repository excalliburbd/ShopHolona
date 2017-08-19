
export const shopActionCreators = {
  SHOP: {
    SET: {
      SHOP:  payload => payload,
      ID:  payload => payload,
      CONTACT_NUMBER:  payload => payload,
      DETAILS_TAB: payload => payload,
      HOURS: payload => payload,
      EDITING: payload => payload,
      EDIT_DESC: payload => payload,
      // NAME: payload => payload,
      // PHONE: payload => payload,
      ADDRESS: payload => payload,
      // CITY: payload => payload,
      // POSTAL: payload => payload,
      FROM_HOUR: payload => payload,
      TO_HOUR: payload => payload,
      // LICENSE_NUMBER: payload => payload,
      // DESCRIPTION: payload => payload,
      PAYMENTS: payload => payload,
      DEMO: {
        PROF_PIC: payload => payload,
        COVER: payload => payload,
        TIN: payload => payload,
      }
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
      DESCRIPTION: payload => payload,
    },
    TOGGLE: {
      PRODUCT_DETAILS:  payload => payload,
    },
    TOGGLE_DETAILS: payload => payload,
    UPDATE_CHIP: payload => payload,
  }
}
