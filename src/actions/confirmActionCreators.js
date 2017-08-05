
export const confirmActionCreators = {
  CONFIRM_DIALOUG: {
    SHOW: payload => payload,
    HIDE: payload => payload,
    SET: {
      TITLE: payload => payload,
      STATEMENT: payload => payload,
    }
  }
}
