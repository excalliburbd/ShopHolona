export const BackOfficeUIReducer = (
  state = {
    selectedIndexs: {
      products: 0,
      orders: 0,
    },
  }, action
) => {
  switch (action.type) {
    case 'CHANGE_UI_TAB':
      return {
        ...state,
        selectedIndexs: {
          ...state.selectedIndexs,
          [action.route]: action.index
        }
      }
    default:
      return state;
  }
}
