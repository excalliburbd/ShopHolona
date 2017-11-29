import { handleActions } from 'redux-actions';

import { backOfficeActions, sidebarActions } from '../actions';

export const BackOfficeUIReducer = handleActions({
  [backOfficeActions.backOffice.set.tab]: (state, action) => {
    return {
      ...state,
      selectedIndexs: {
        ...state.selectedIndexs,
        [action.payload.route]: action.payload.index
      }
    }
  },
  [sidebarActions.sidebar.show.orderDetails]: (state, action) => {
    return {
      ...state,
      selectedOrder: action.payload,
    }
  },
}, {
  selectedIndexs: {
    products: 0,
    orders: 0,
  },
  selectedOrder: null,
});
