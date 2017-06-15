
export const productActionCreators = {
  PRODUCTS: {
    UI: {
      SET: {
        ADD: {
          CATEGORY:  payload => payload,
          SUB_CATEGORY:  payload => payload,
          SUB_SUB_CATEGORY:  payload => payload,
          NAME:  payload => payload,
          WEIGHT:  payload => payload,
          PRICE:  payload => payload,
          DESC:  payload => payload,
        },
        EDIT: {
          NAME:  payload => payload,
          WEIGHT:  payload => payload,
          PRICE:  payload => payload,
          DESC:  payload => payload,
        },
        VARIANCE:  payload => payload,
        PRODUCT_VARIANCE:  payload => payload,
        PRODUCT_ATTRIBUTE:  payload => payload,
      },
      RESET: {
        CATEGORIES:  payload => payload,
        SUB_SUB_CATEGORIES:  payload => payload,
        SUB_CATEGORIES:  payload => payload,
      }
    },
    DONE: {
      DELETE: {
        PRODUCT:  payload => payload,
        FEATURED_PRODUCT:  payload => payload,
      },
      GET: {
        PRODUCTS:  payload => payload,
        FEATURED_PRODUCTS:  payload => payload,
      }
    }
  }
}
