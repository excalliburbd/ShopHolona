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
import CartIcon from '../Cart/CartIcon';

import FilterBarContainer from '../../containers/FilterBarContainer';
import SignUpContainer from '../../containers/SignUpContainer';
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

    const id = window.shopID;

    if(location.search !== '') {
      const searchParts = location.search.split('&');

      if (searchParts.length === 2) {
          const idPart = searchParts[0].split('=');
          const tokenPart = searchParts[1].split('=');

          if (idPart[0] === '?shopId' && tokenPart[0] === 'accessToken') {
            handleSetCredentials(idPart[1], tokenPart[1], parseInt(idPart[1], 10) === demostore);
          }

          history.replace('/');
      } else if (searchParts.length === 1) {
        const idPart = searchParts[0].split('=');

        if (idPart[0] === '?shopId') {
          handleSetCredentials(idPart[1], null, parseInt(idPart[1], 10) === demostore);
        }

        history.replace('/');
      } else {
        id && handleSetCredentials(id, null, id === demostore);
      }
    } else {
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
          return <SignUpContainer />
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
                  (location.pathname === '/') ?
                    'Navigation-content-main' :
                    'Navigation-content'
                } >
              <FilterBarContainer
                show={ ('/' !== location.pathname) }
                flat={ ('/dashboard' !== location.pathname)}
                route={ location.pathname } />
                <div data-tour="navigation-content" >
                  { children }
                </div>
            </div>
          </Panel>
          <Sidebar pinned={ showSidebar } className="Navigation-sidebar" >
            <div className="Navigation-sidebar-action">
              <IconButton icon='close' onClick={ handleHideSidebar }/>
              <h1>
                { titleMsg }
              </h1>
            </div>
            <CartIcon />
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
