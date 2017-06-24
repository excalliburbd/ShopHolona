
import { createSelector } from 'reselect';

export const getToken = state => state.user.token;
export const getUserDetails = state => state.user;

export const getVendor = createSelector(
  [getUserDetails],
  (user) => {
    if(user.registered_as === 1) {
      return true;
    }

    return false;
  }
);
