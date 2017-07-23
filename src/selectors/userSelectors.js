
import { createSelector } from 'reselect';

import { getShopID } from './shopSelectors';

export const getLoggedIn = state => state.user.isLoggedIn && state.user.token;
export const getToken = state => state.user.token;
export const getUserDetails = state => state.user;
export const getShopVendor = state => state.user.shopvendor;
export const followingShops = state => state.user.following;

export const following = createSelector(
  [getShopID, followingShops],
  (thisShop, followingShops) => {
    const filtered = followingShops.filter( following => following.shop.id === thisShop);

    return filtered.length > 0 && filtered[0].shop.id === thisShop;
  }
)

export const getVendor = createSelector(
  [getUserDetails, getShopVendor],
  (user, vendor) => {
    if(user.registered_as === 1 && vendor) {
      return true;
    }

    return false;
  }
);
