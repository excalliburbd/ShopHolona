
export const shopActionCreators = {
  SHOP: {
    SET: {
      SHOP:  payload => payload,
      ID:  payload => payload,
      CONTACT_NUMBER:  payload => payload,
      ADDRESS:  payload => payload,
    },
    EDIT: {
      NAME: payload => payload,
    },
    TOGGLE_DETAILS: payload => payload,
    UPDATE_CHIP: payload => payload,
  }
}
