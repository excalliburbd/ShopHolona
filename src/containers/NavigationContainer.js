import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Nav from '../components/Navigation';

const mapStateToProps = state => {
  return {
    searchbar: state.ui.nav.searchbar,
    showSidebar: state.ui.sidebar.show,
    userLoggedIn: state.user.isLoggedIn,
    sidebarType: state.ui.sidebar.type,
    shopName: state.shop.name,
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
  }
}

const NavigationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));

export default NavigationContainer;
