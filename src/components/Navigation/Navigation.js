import React , { Component }from 'react';
import classNames from 'classnames';
import { Helmet } from "react-helmet";

import Layout from 'react-toolbox/lib/layout/Layout';
import Sidebar from 'react-toolbox/lib/layout/Sidebar';
import Panel from 'react-toolbox/lib/layout/Panel';
import IconButton from 'react-toolbox/lib/button/IconButton';

import NavigationDrawer from './NavigationDrawer';
import NavigationAppBar from './NavigationAppBar';
import NotFound from '../NotFound';
import CheckoutIcon from '../../assets/images/header-checkout.svg';
import CartIcon from '../../assets/images/cart-header-icon.svg';

import FilterBarContainer from '../../containers/FilterBarContainer';
import SigninSignup from '../SignUp/SignInSignUp';
import AddButtonContainer from '../../containers/AddButtonContainer';
import ProductsSidebarContainer from '../../containers/ProductsSidebarContainer';
import ImageUploaderContainer from '../../containers/ImageUploaderContainer';
import CartContainer from '../../containers/CartContainer';
import NotificationContainer from '../../containers/NotificationContainer';
import TourContainer from '../../containers/TourContainer';
import Confirm from '../../containers/ConfirmContainer';
import CheckoutContainer from '../../containers/CheckoutContainer';

import './Navigation.css';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  handleKeyDown (event) {
    let sidebarSubType = this.props.sidebarSubType;
    switch( event.keyCode ) {
      case 27:
        if (sidebarSubType !== 'FINALIZE_ORDER') {
          this.props.handleHideSidebar(sidebarSubType);
        }
        break;
      default:
        break;
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillReceiveProps(nextProps) {

    const {
      online,
      shopID,
      hadleLoadData,
      token,
      vendor,
      isDemostore,
    } = nextProps;

    if(this.props.online !== online && online && shopID ) {
      hadleLoadData(shopID, token, isDemostore || vendor);
    }
  }

  componentDidMount() {
    const {
      history,
      location,
      handleSetCredentials,
      handleGetMedia,
      demostore,
    } = this.props;

    handleGetMedia();

    if(location.search !== '') {
      const search = location.search.substring(1);

      let queryParams = {
        shopId: null,
        accessToken: null,
      }

      try {// this code is unstable
        queryParams = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      } catch (e) {

      }

      const {
        accessToken,
      } = queryParams;

      const shopID = queryParams.shopId || window.shopID;

      handleSetCredentials(shopID, accessToken, parseInt(shopID, 10) === demostore);

      if (accessToken) {
        history.replace('/');
      }
    } else {
      const id = window.shopID;
      id && handleSetCredentials(id, null, id === demostore);
    }
  }

  render() {
    const {
      location,
      history,
      searchbar,
      showSearchbar,
      hideSearchbar,
      showSidebar,
      handleHideSidebar,
      userLoggedIn,
      handleSignIn,
      handleSignOut,
      sidebarType,
      sidebarSubType,
      shopName,
      refCode,
      pinned,
      vendor,
      profilePic,
      showCartSidebar,
      titleMsg,
      children,
    } = this.props;

    const panelClass = classNames('Navigation-panel', {
      'Navigation-panel-left': pinned,
    })

    const SidebarContent = () => {
      switch(sidebarType){
        case 'SIGNIN':
          return <SigninSignup hideSideBar={ handleHideSidebar } isLogin={ true }/>
        case 'PRODUCT':
          return <ProductsSidebarContainer />
        case 'CART':
          return <CartContainer />
        case 'CHECKOUT':
          return <CheckoutContainer />
        default:
          return null;
      }
    }

    let notFound = false;
    if (location.pathname === '/not-found') {
      notFound = true;
    }

    if (notFound) {
      return <NotFound />
    }

    const hideBlur = {
      display: 'none'
    }

    const showBlur = {
      display: 'block'
    }

    return (
      <div>
        <TourContainer />
        <NotificationContainer />
        <Layout className="Navigation">
          <Helmet>
            <title>{ shopName }</title>
          </Helmet>
          <ImageUploaderContainer />
          <Confirm />
          <AddButtonContainer vendor={ vendor } />
          <NavigationDrawer pinned={ pinned } history={ history } location={ location }/>
            <Panel className={ panelClass }>
              {/* ADDED A CLASS AFTER SHIFTING TO CHECKOUT WHICH WILL MAKE THE BACKGROUND RGBA BLACK */}
            <div className="background-blurzy" style={ (sidebarType !== 'CART' && sidebarType && sidebarType !== 'PRODUCT'? showBlur : hideBlur) }></div>
              <NavigationAppBar searchbar={ searchbar }
                                history={ history }
                                location={ location }
                                shopName={ shopName }
                                refCode={ refCode }
                                hideSearchbar={ hideSearchbar }
                                userLoggedIn={ userLoggedIn }
                                handleSignOut={ handleSignOut }
                                showSearchbar={ showSearchbar }
                                handleSignIn={ handleSignIn }
                                vendor={ vendor }
                                profilePic={ profilePic }
                                showCartSidebar={ showCartSidebar } />
              <div className={
                    (location.pathname === '/' || location.pathname.split('/')[1] === 'product') ?
                      'Navigation-content-main' :
                      'Navigation-content'
                  } >
                <FilterBarContainer
                  show={ (location.pathname === '/' && location.pathname.split('/')[1] === 'product') }
                  flat={ ('/dashboard' !== location.pathname)}
                  route={ location.pathname } />
                  <div data-tour="navigation-content" >
                    { children }
                  </div>
              </div>
            </Panel>
          }
          <Sidebar pinned={ showSidebar } className="Navigation-sidebar" >
            <div className="Navigation-sidebar-action">
              {sidebarSubType !== 'FINALIZE_ORDER' && <IconButton icon='close' onClick={ handleHideSidebar }/>}
              <h1>
                { titleMsg }
              </h1>
              <img src={ sidebarType === 'CART'? CartIcon : CheckoutIcon } alt="" className="checkout-header-icon"/>
            </div>
            <div className="Navigation-sidebar-content">
              <SidebarContent />
            </div>
          </Sidebar>
        </Layout>
      </div>
    );
  }
}

export default Nav;
