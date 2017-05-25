import React , { Component }from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Layout from 'react-toolbox/lib/layout/Layout';
import Sidebar from 'react-toolbox/lib/layout/Sidebar';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';

import Link from 'react-toolbox/lib/link/Link';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Button from 'react-toolbox/lib/button/Button';

import MdSettings from 'react-icons/lib/md/settings';
import MdProfile from 'react-icons/lib/md/account-circle';
import MdSignout from 'react-icons/lib/md/power-settings-new';
import MdCart from 'react-icons/lib/md/shopping-cart';
import MdSearch from 'react-icons/lib/md/search';
import MdClear from 'react-icons/lib/md/clear';
import MdAdd from 'react-icons/lib/md/add';

import NavigationDrawer from './NavigationDrawer';
import NavigationAppBar from './NavigationAppBar';

import FilterBarContainer from '../../containers/FilterBarContainer';
import SignUpContainer from '../../containers/SignUpContainer';
import AddButtonContainer from '../../containers/AddButtonContainer';
import ProductsSidebarContainer from '../../containers/ProductsSidebarContainer';

import './Navigation.css';

class Nav extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    const {
      history,
      location,
      handleSetCredentials,
      handleSetSideDrawer,
    } = this.props;

    if(location.search !== '') {
      const searchParts = location.search.split('&');

      if(searchParts.length === 2) {
        const idPart = searchParts[0].split('=');
        const tokenPart = searchParts[1].split('=');

        if(idPart[0] === '?shopId' && tokenPart[0] === 'accessToken') {
          handleSetCredentials(idPart[1], tokenPart[1]);
        }
      }

      history.replace('/');
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
        default:
          return null;
      }
    }

    return (
      <Layout className="Navigation">
        <AddButtonContainer />
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
                            handleSignIn={ handleSignIn } />
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
