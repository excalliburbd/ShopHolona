import React , { Component }from 'react';
import classNames from 'classnames';
// import fetch from 'isomorphic-fetch';

import Layout from 'react-toolbox/lib/layout/Layout';
import Sidebar from 'react-toolbox/lib/layout/Sidebar';
import Panel from 'react-toolbox/lib/layout/Panel';
import IconButton from 'react-toolbox/lib/button/IconButton';

import NavigationDrawer from './NavigationDrawer';
import NavigationAppBar from './NavigationAppBar';
import NotFound from '../NotFound';

import FilterBarContainer from '../../containers/FilterBarContainer';
import SignUpContainer from '../../containers/SignUpContainer';
import AddButtonContainer from '../../containers/AddButtonContainer';
import ProductsSidebarContainer from '../../containers/ProductsSidebarContainer';
import ImageUploaderContainer from '../../containers/ImageUploaderContainer';
import CartContainer from '../../containers/CartContainer';

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
    } = nextProps;

    if(this.props.online !== online && online) {
      shopID && hadleLoadData(shopID);
    }
  }

  componentDidMount() {
    const {
      history,
      location,
      handleSetCredentials,
      handleGetMedia,
    } = this.props;

    handleGetMedia();

    // if(location.search !== '') {
    //   const searchParts = location.search.split('&');

    //   if(searchParts.length === 2) {
    //     const idPart = searchParts[0].split('=');
    //     const tokenPart = searchParts[1].split('=');

    //     if(idPart[0] === '?shopId' && tokenPart[0] === 'accessToken') {
    //       handleSetCredentials(idPart[1], tokenPart[1]);
    //     }
    //   }

    //   if(searchParts.length === 1) {
    //     const idPart = searchParts[0].split('=');

    //     if(idPart[0] === '?shopId') {
    //       handleSetCredentials(idPart[1]);
    //     }
    //   }

    //   history.replace('/');
    // }

    // fetch(`${process.env.PUBLIC_URL}/details.json`, {})
    //       .then(
    //         res => res.json()
    //       ).then(
    //         res => {
    //           handleSetCredentials(res.shop_id);
    //         }
    //       )

    const id = window.shopID;
    handleSetCredentials(id);


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
      <Layout className="Navigation">
        <ImageUploaderContainer />
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
              }>
            <FilterBarContainer
              show={ ('/' !== location.pathname) }
              flat={ ('/dashboard' !== location.pathname)}
              route={ location.pathname } />
            { children }
          </div>
        </Panel>
        <Sidebar pinned={ showSidebar } className="Navigation-sidebar" >
          <div className="Navigation-sidebar-action">
            <IconButton icon='close' onClick={ handleHideSidebar }/>
            <h1>Add Products/Services</h1>
          </div>
          <div className="Navigation-sidebar-content">
            <SidebarContent />
          </div>
        </Sidebar>
      </Layout>
    );
  }
}

export default Nav;
