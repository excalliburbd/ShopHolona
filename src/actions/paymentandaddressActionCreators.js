
export const paymentandaddressActionCreators = {
  PAYMENTS_AND_ADDRESSES: {
    DONE: {
      GET: {
        BANK: payload => payload,
      },
      DELETE: payload => payload,
    },
    UI: {
      SET: {
        BANK: payload => payload,
        BANK_ID: payload => payload,
      }
    }
  }
}
