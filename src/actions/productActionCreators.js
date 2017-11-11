
export const productActionCreators = {
  PRODUCTS: {
    UI: {
      SET: {
        ADD: {
          CATEGORY: payload => payload,
          SUB_CATEGORY: payload => payload,
          SUB_SUB_CATEGORY: payload => payload,
          NAME: payload => payload,
          WEIGHT: payload => payload,
          PRICE: payload => payload,
          DESC: payload => payload,
        },
        EDIT: {
          NAME: payload => payload,
          WEIGHT: payload => payload,
          PRICE: payload => payload,
          DESC: payload => payload,
          IMAGE: payload => payload,
          STOCK: payload => payload,
        },
        DELETE: {
          IMAGE: payload => payload,
        },
        VARIANCE: payload => payload,
        PRODUCT_VARIANCE: payload => payload,
        PRODUCT_ATTRIBUTE: payload => payload,
        EDITING: payload => payload,
        NAME: payload => payload,
        WEIGHT: payload => payload,
        PRICE: payload => payload,
        DESC: payload => payload,
        ATTRIBUTE: payload => payload,
        VARIANT: payload => payload,
        IMAGE: payload => payload,
        FEATURED_PRODUCT: payload => payload,
      },
      RESET: {
        CATEGORIES: payload => payload,
        SUB_SUB_CATEGORIES: payload => payload,
        SUB_CATEGORIES: payload => payload,
        PRODUCT: payload => payload,
      },
      TOGGLE: {
        INFO: payload => payload,
      }
    },
    DONE: {
      DELETE: {
        PRODUCT: payload => payload,
        FEATURED_PRODUCT: payload => payload,
      },
      GET: {
        PRODUCTS: payload => payload,
        FEATURED_PRODUCTS: payload => payload,
        ATTRIBUTES: payload => payload,
      }
    },
    START: {
      GET: payload => payload,
    }
  }
}
