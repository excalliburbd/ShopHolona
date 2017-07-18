import { handleActions } from 'redux-actions';

import { tourActions } from '../actions/';

export const tourUIReducer = handleActions({
  [tourActions.tour.set.open]: (state, action) => {
    return {
      isOpen: action.payload,
    }
  }
}, {
  isOpen: false,
});
