import { handleActions } from 'redux-actions';

import { confirmActions } from '../actions/';

export const confirmDialougReducers = handleActions({
  [confirmActions.confirmDialoug.show]: (state, action) => {
    return {
      ...state,
      active: true,
      action: action.payload,
    }
  },
  [confirmActions.confirmDialoug.hide]: (state, action) => {
    return {
      ...state,
      active: false,
    }
  },
  [confirmActions.confirmDialoug.set.title]: (state, action) => {
    return {
      ...state,
      title: action.payload,
    }
  },
  [confirmActions.confirmDialoug.set.statement]: (state, action) => {
    return {
      ...state,
      statement: action.payload,
    }
  },
}, {
  active: false,
  action: () => null,
});
