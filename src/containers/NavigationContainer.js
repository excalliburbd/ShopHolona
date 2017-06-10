import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createSelector } from 'reselect';
import { mediaQueryTracker } from 'redux-mediaquery';

import { getAllProducts, getFeaturedProduct } from '../thunks/productThunks';
import { getShopCategories, getShop, getShopAddress } from '../thunks/shopThunks';
import { getMe } from '../thunks/userThunks';

import {
  userActions,
  sidebarActions,
  shopActions,
} from '../actions/';

import Nav from '../components/Navigation/Navigation';

const getLocation = state => state.router.location;
const getUserDetails = state => state.user;

const getPinState = createSelector(
  [getLocation],
  location => {
    if (location.pathname === '/') {
      return false;
    } else {
      return true;
    }
  }
)

const getVendors = createSelector(
  [getUserDetails],
  (user) => {
    if((user.registered_as === 0) || (user.registered_as === 1)) {
      return true;
    }

    return false;
  }
);

const mapStateToProps = state => {
  return {
    searchbar: state.ui.nav.searchbar,
    showSidebar: state.ui.sidebar.show,
    userLoggedIn: state.user.isLoggedIn,
    sidebarType: state.ui.sidebar.type,
    shopID: state.shop.id,
    shopName: state.shop.shop_name,
    refCode: state.user.referral.code,
    pinned: getPinState(state),
    vendor: getVendors(state),
    profilePic: state.user.profile_pic,
    online: state.offline.online,
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
     dispatch(sidebarActions.sidebar.show.signIn())
   },
   handleHideSidebar: () => {
     dispatch(sidebarActions.sidebar.hide());
   },
   handleSignOut: () => {
      dispatch(userActions.user.manualSignOut())
    },
    handleSetCredentials: (shop, token) => {
      dispatch(shopActions.shop.set.id(shop));

      dispatch(getShop(shop));
      dispatch(getShopCategories(shop));
      dispatch(getAllProducts(shop));
      dispatch(getShopAddress(shop));
      dispatch(getFeaturedProduct(shop));

      if (token) {
        dispatch(userActions.user.done.get.token(token));
        dispatch(getMe(token));
      }
    },
    handleSetSideDrawer: val => {
      dispatch({
        type: 'SET_NAVIGATION_PIN_SIDEDRAWER',
        payload: val,
      })
    },
    hadleLoadData: shop => {
      dispatch(getShop(shop));
      dispatch(getShopCategories(shop));
      dispatch(getAllProducts(shop));
      dispatch(getShopAddress(shop));
      dispatch(getFeaturedProduct(shop));
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
      dispatch(sidebarActions.sidebar.show.addToCart())
    }
  }
}

const NavigationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));

export default NavigationContainer;
