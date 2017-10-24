
export const paymentandaddressActionCreators = {
  PAYMENTS_AND_ADDRESSES: {
    DONE: {
      GET: {
        BANK: payload => payload,
        BRANCH: payload => payload,
        BANK_BRANCH: payload => payload,
        DISTRICTS: payload => payload,
        CITIES: payload => payload,
        THANAS: payload => payload,
      },
      DELETE: payload => payload,
    },
    UI: {
      SET: {
        BANK: payload => payload,
        BANK_ID: payload => payload,
        BRANCH: payload => payload,
        BRANCH_ID: payload => payload,
        ACCOUNT: {
          NAME: payload => payload,
          NUMBER: payload => payload,
        },
        DISTRICT: payload => payload,
        DISTRICT_ID: payload => payload,
        CITY: payload => payload,
        CITY_ID: payload => payload,
        THANA: payload => payload,
        THANA_ID: payload => payload,
        DETAILS: payload => payload,
        TITLE: payload => payload,
        SELECTED_CHECKOUT_ADDRESS: payload => payload,
        ADDITIONAL_COMMENTS: payload => payload,
      }
    }
  }
}
