import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createSelector } from 'reselect';

import { getCategory, getAllProducts, getFeaturedProduct } from '../actions/productsActions';
import { getShopCategories, getShop } from '../actions/shopActions';
import { getMe } from '../actions/userActions';

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
    if(user.registered_as) {
      return (user.registered_as === 1)
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
    shopName: state.shop.shop_name,
    refCode: state.user.referral.code,
    pinned: getPinState(state),
    vendor: getVendors(state),
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
     dispatch({
       type: 'SHOW_SIDEBAR_SIGNIN'
     })
   },
   handleHideSidebar: () => {
     dispatch({
       type: 'HIDE_SIDEBAR'
     })
   },
   handleSignOut: () => {
      dispatch({
        type: 'USER_MANUAL_SIGNOUT',
      })
    },
    handleSetCredentials: (shop, token) => {
      dispatch({
        type: 'SET_SHOP_ID',
        payload: shop,
      });
      dispatch(getShop(shop));
      dispatch(getShopCategories(shop));
      dispatch(getAllProducts(shop));

      dispatch({
        type: 'USER_SET_TOKEN',
        token,
      });

      dispatch(getFeaturedProduct(shop, token));
      dispatch(getMe(token));
    },
    handleSetSideDrawer: val => {
      dispatch({
        type: 'SET_NAVIGATION_PIN_SIDEDRAWER',
        payload: val,
      })
    }
  }
}

const NavigationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));

export default NavigationContainer;
