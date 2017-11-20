import { handleActions } from 'redux-actions';

import { navigationActions } from '../actions';

export const navigationUIReducer = handleActions({
  [navigationActions.navigation.set.searchString]: (state, action) => {
    return {
      ...state,
      searchString: action.payload,
    }
  },
  [navigationActions.navigation.show.searchbar]: (state, action) => {
    return {
      ...state,
      searchbar: true,
    }
  },
  [navigationActions.navigation.hide.searchbar]: (state, action) => {
    return {
      ...state,
      searchbar: false,
    }
  },
}, {
  searchbar: false,
  searchString: '',
})

