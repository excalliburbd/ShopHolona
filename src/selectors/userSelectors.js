
import { createSelector } from 'reselect';

export const getToken = state => state.user.token;
export const getUserDetails = state => state.user;
export const getShopVendor = state => state.user.shopvendor;

export const getVendor = createSelector(
  [getUserDetails, getShopVendor],
  (user, vendor) => {
    if(user.registered_as === 1 && vendor) {
      return true;
    }

    return false;
  }
);
