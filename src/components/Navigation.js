import React from 'react';
import PropTypes from 'prop-types';

import Layout from 'react-toolbox/lib/layout/Layout';
import Sidebar from 'react-toolbox/lib/layout/Sidebar';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';

import Link from 'react-toolbox/lib/link/Link';
import Button from 'react-toolbox/lib/button/Button';
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
  children
}) => {

  return <Layout className="Navigation">
    <Button icon={
              <MdAdd />
            }
            floating
            className="Navigation-addbutton" />

    <NavigationDrawer history={ history } location={ location } />

    <Panel className="Navigation-panel">

      <NavigationAppBar searchbar={ searchbar }
                       history={ history }
                       hideSearchbar={ hideSearchbar }
                       userLoggedIn={ userLoggedIn }
                       handleSignOut={ handleSignOut }
                       showSearchbar={ showSearchbar }
                       handleSignIn={ handleSignIn } />

      <div className="Navigation-content">
        <FilterBarContainer
          show={ ('/' !== location.pathname) }
          flat={ ('/dashboard' !== location.pathname)}
          route={ location.pathname } />
        { children }
      </div>
    </Panel>
    <Sidebar pinned={ showSidebar } scrollY className="Navigation-sidebar" >
      <IconButton icon='close' onClick={ handleHideSidebar }/>
      <SignUpContainer />
    </Sidebar>
  </Layout>
};

Nav.propTypes = {
}

export default Nav;
