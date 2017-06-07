
export const serviceActionCreators = {
  SERVICES: {
    UI: {
      SET: {
        ADD: {
          CATEGORY:  payload => payload,
          SUB_CATEGORY:  payload => payload,
          SUB_SUB_CATEGORY:  payload => payload,
          TITLE:  payload => payload,
          FEE:  payload => payload,
          DESC:  payload => payload,
        },
        EDIT: {
          TITLE:  payload => payload,
          FEE:  payload => payload,
          DESC:  payload => payload,
        },
        VARIANCE:  payload => payload,
      },
      RESET: {
        CATEGORIES:  payload => payload,
        SUB_SUB_CATEGORIES:  payload => payload,
        SUB_CATEGORIES:  payload => payload,
      }
    },
    DONE: {
      DELETE: {
        SERVICE:  payload => payload,
        FEATURED_SERVICE:  payload => payload,
      },
      GET: {
        SERVICES:  payload => payload,
        FEATURED_SERVICES:  payload => payload,
      }
    }
  }
}
