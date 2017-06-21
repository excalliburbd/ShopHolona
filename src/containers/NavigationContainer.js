import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { mediaQueryTracker } from 'redux-mediaquery';

import { getAllProducts, getFeaturedProduct } from '../thunks/productThunks';
import {
  getShopCategories,
  getShop,
  getShopAddress,
  getShopHours,
} from '../thunks/shopThunks';
import { getMe } from '../thunks/userThunks';
import { getCart } from '../thunks/cartThunks';

import {
  userActions,
  sidebarActions,
  shopActions,
} from '../actions/';

import { getVendor } from '../selectors/shopSelectors';
import { getToken } from '../selectors/userSelectors';
import { getPinState, getTitleMsg } from '../selectors/navigationSelectors';

import Nav from '../components/Navigation/Navigation';


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
    vendor: getVendor(state),
    profilePic: state.user.profile_pic,
    online: state.offline.online,
    token: getToken(state),
    titleMsg: getTitleMsg(state),
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
    handleSetCredentials: (shop, token) => {
      dispatch(shopActions.shop.set.id(shop));

      dispatch(getShop(shop));
      dispatch(getShopCategories(shop));
      dispatch(getAllProducts(shop));
      dispatch(getShopAddress(shop));
      dispatch(getFeaturedProduct(shop));
    },
    handleSetSideDrawer: val => {
      dispatch({
        type: 'SET_NAVIGATION_PIN_SIDEDRAWER',
        payload: val,
      })
    },
    hadleLoadData: (shop, token) => {
      dispatch(getShop(shop));
      dispatch(getShopCategories(shop));
      dispatch(getAllProducts(shop));
      dispatch(getShopAddress(shop));
      dispatch(getFeaturedProduct(shop));

      if (token) {
        dispatch(getCart(token, false));
        dispatch(getShopHours(shop, token));
      }
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
    }
  }
}

const NavigationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));

export default NavigationContainer;
