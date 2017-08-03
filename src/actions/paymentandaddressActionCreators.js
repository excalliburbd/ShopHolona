
export const paymentandaddressActionCreators = {
  PAYMENTS_AND_ADDRESSES: {
    DONE: {
      GET: {
        BANK: payload => payload,
        BRANCH: payload => payload,
        BANK_BRANCH: payload => payload,
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
        }
      }
    }
  }
}
