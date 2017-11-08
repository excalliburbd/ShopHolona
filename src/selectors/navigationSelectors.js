import { createSelector } from 'reselect';

export const getLocation = state => state.router.location;
export const getUserDetails = state => state.user;
export const getTitleMsg = state => state.ui.sidebar.titleMsg;

export const getPinState = createSelector(
  [getLocation],
  location => {
    if (location.pathname === '/' || location.pathname.split('/')[1] === 'product') {
      return false;
    } else {
      return true;
    }
  }
);
