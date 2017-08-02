
export const categoryActionCreators = {
  CATEGORIES: {
    UI: {
      SET: {
        CATEGORY: payload => payload,
        SUB_CATEGORY: payload => payload,
        SUB_SUB_CATEGORY: payload => payload,
        PRODUCT_IMAGES: payload => payload,
        ATTR: {
          PRIMARY: payload => payload,
          SECONDARY: payload => payload,
          SELECTED: payload => payload,
          SELECT_PRIMARY: payload => payload,
          SELECT_SECONDARY: payload => payload,
          CUSTOM: payload => payload,
          FROM_LIST: {
            PRIMARY: payload => payload,
            SECONDARY: payload => payload,
          },
          TEMP: {
            ATTRIBUTE: payload => payload,
            KEY: payload => payload,
            VALUE: payload => payload,
            STOCK: payload => payload,
          }
        }
      },
      RESET: {
        SUB_SUB_CATEGORIES: payload => payload,
        SUB_CATEGORIES: payload => payload,
        CATEGORIES: payload => payload,
      },
      UPDATE: {
        STOCK: payload => payload,
        STOCK_INC: payload => payload,
        STOCK_DEC: payload => payload,
      },
      VALIDATE_STOCK: payload => payload,
      UNSET_PRIMARY_ATTR: payload => payload,
      ADD_PRIMARY_ATTRIBUTE: payload => payload,
    },
    DONE: {
      GET: {
        CATEGORY: payload => payload,
        SUB_CATEGORY: payload => payload,
        SUB_SUB_CATEGORY: payload => payload,
        SHOP_CATEGORY: payload => payload,
        SUB_SUB_CATEGORIES: payload => payload,
        PRODUCT_IMAGES: payload => payload,
      },
      POST: {
        PRODUCT_IMAGE: [
          payload => payload,
          meta => meta,
        ],
        CUSTOM_ATTR: {
          ID_PRIMARY: payload => payload,
          ID_SECONDARY: payload => payload,
          PRIMARY: payload => payload,
          SECONDARY: payload => payload,
        },
      }
    },
    REMOVE:{
      PRODUCT_IMAGE: payload => payload,
      // SUB_SUB_CATEGORIES: payload => payload,
    }
  }
};
