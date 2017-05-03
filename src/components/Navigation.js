import React from 'react';
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

import MdSettings from 'react-icons/lib/md/settings';
import MdProfile from 'react-icons/lib/md/account-circle';
import MdSignout from 'react-icons/lib/md/power-settings-new';
import MdCart from 'react-icons/lib/md/shopping-cart';
import MdSearch from 'react-icons/lib/md/search';
import MdClear from 'react-icons/lib/md/clear';
import MdAdd from 'react-icons/lib/md/add';

import NavigationDrawer from './NavigationDrawer';
import NavigationAppBar from './NavigationAppBar';

import FilterBarContainer from '../containers/FilterBarContainer';
import SignUpContainer from '../containers/SignUpContainer';
import AddButtonContainer from '../containers/AddButtonContainer';
import ProductsSidebarContainer from '../containers/ProductsSidebarContainer';

import './Navigation.css';

const Nav = ({
  location,
  history,
  searchbar,
  showSearchbar,
  hideSearchbar,
  sidebar,
  showSidebar,
  handleHideSidebar,
  userLoggedIn,
  handleSignIn,
  handleSignOut,
  sidebarType,
  children
}) => {

  let pinned = true;

  if('/' === location.pathname) {
    pinned = false;
  }

  const panelClass = classNames({
    'Navigation-panel-left': pinned,
  })

  const SidebarContent = () => {
    switch(sidebarType){
      case 'SIGNIN':
        return <SignUpContainer />
      case 'ADD_PRODUCT':
        return <ProductsSidebarContainer />
      default:
        return null;
    }
  }

  return (
    <Layout className="Navigation">

      <AddButtonContainer history={ history }
                          location={ location } />

      <NavigationDrawer pinned={ pinned } history={ history } />

      <Panel className={ panelClass }>

        <NavigationAppBar searchbar={ searchbar }
                          history={ history }
                          location={ location }
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

      <Sidebar pinned={ showSidebar } scrollY className="Navigation-sidebar" >
        <IconButton icon='close' onClick={ handleHideSidebar }/>
        <SidebarContent />
      </Sidebar>
    </Layout>
  );
}

Nav.propTypes = {
}

export default Nav;
