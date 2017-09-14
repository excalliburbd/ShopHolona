import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { mediaQueryTracker } from 'redux-mediaquery';

import { getAllProducts, getFeaturedProduct } from '../thunks/productThunks';
import {
  getShopCategories,
  getShop,
  getShopAddress,
  getShopPayments,
} from '../thunks/shopThunks';
import {
  tryGetVendor,
  trySignInAsyncAction,
  getMe,
  getFollowingShop,
  getUserAddress,
} from '../thunks/userThunks';
import { getCart } from '../thunks/cartThunks';
import {
  getBanks,
  getDistricts,
} from '../thunks/paymentandaddressThunks';

import {
  userActions,
  sidebarActions,
  shopActions,
} from '../actions/';

import { getVendor, getToken } from '../selectors/userSelectors';
import { getPinState, getTitleMsg } from '../selectors/navigationSelectors';
import {
  getDemostore,
  getIsDemostore,
} from '../selectors/shopSelectors';

import Nav from '../components/Navigation/Navigation';

import config from '../config';

const mapStateToProps = state => {
  return {
    searchbar: state.ui.nav.searchbar,
    showSidebar: state.ui.sidebar.show,
    userLoggedIn: state.user.isLoggedIn,
    sidebarType: state.ui.sidebar.type,
    shopID: state.shop.id,
    shopName: state.shop.shop_name,
    refCode: state.shop.referral.code,
    pinned: getPinState(state),
    vendor: getVendor(state),
    profilePic: state.user.profile_pic,
    online: state.offline.online,
    token: getToken(state),
    titleMsg: getTitleMsg(state),
    demostore: getDemostore(state),
    isDemostore: getIsDemostore(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showSearchbar: () => {
      dispatch({
        type: 'SHOW_NAVIGATION_SEARCHBAR',
      })
    },
    hideSearchbar: () => {
      dispatch({
        type: 'HIDE_NAVIGATION_SEARCHBAR',
      })
    },
    handleSignIn: () => {
      dispatch(sidebarActions.sidebar.show.signIn());
    },
    handleHideSidebar: () => {
      dispatch(sidebarActions.sidebar.hide());
    },
    handleSignOut: () => {
      dispatch(userActions.user.manualSignOut());
    },
    handleSetCredentials: (shop, token, demostore) => {
      dispatch(shopActions.shop.set.id(shop));
      dispatch(getShop(shop));
      dispatch(getShopCategories(shop));
      dispatch(getAllProducts(shop, null, null));
      dispatch(getShopAddress(shop));
      dispatch(getFeaturedProduct(shop));
      dispatch(getBanks());
      dispatch(getDistricts());

      if (token && !demostore) {
        dispatch(userActions.user.done.get.token(token));
        dispatch(getMe(token));
        dispatch(tryGetVendor(shop, token));
        dispatch(getFollowingShop(shop, token));
        dispatch(getShopPayments(shop, token));
        dispatch(getUserAddress(token));
      }

      if (demostore) {
        dispatch(
          trySignInAsyncAction({ email: config.demouser, password: config.demopass}, shop)
        );
        dispatch(userActions.user.done.get.token(token));
        dispatch(getMe(token));
        dispatch(tryGetVendor(shop, token));
        dispatch(getFollowingShop(shop, token));
        dispatch(getShopPayments(shop, token));
      }
    },
    hadleLoadData: (shop, token, vendor) => {
      dispatch(getShop(shop));
      dispatch(getShopCategories(shop));
      dispatch(getAllProducts(shop, null, null));
      dispatch(getShopAddress(shop));
      dispatch(getFeaturedProduct(shop));
      dispatch(getBanks());
      dispatch(getDistricts());

      if (token) {
        dispatch(getCart(token, false));
        dispatch(tryGetVendor(shop, token));
        dispatch(getFollowingShop(shop, token));
        dispatch(getUserAddress(token));
      }
    },
    handleSetSideDrawer: val => {
      dispatch({
        type: 'SET_NAVIGATION_PIN_SIDEDRAWER',
        payload: val,
      })
    },
    handleGetMedia: () => {
      dispatch(mediaQueryTracker({
        isPhone: "screen and (max-width: 767px)",
        isTablet: "screen and (max-width: 1024px)",
        innerWidth: true,
        innerHeight: true,
      }));
    },
    showCartSidebar: () => {
      dispatch(sidebarActions.sidebar.show.addToCart());
    },
  }
}

const NavigationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));

export default NavigationContainer;
