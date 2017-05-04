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

<<<<<<< Updated upstream
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
=======
  return <Layout className="Navigation">
    <Button icon={
              <MdAdd />
            }
            floating
            className="Navigation-addbutton" />
    <NavDrawer pinned={ pinned } className="Navigation-sidebar">
      <List selectable >
        <div className="Navigation-filler--div" />
        {
          [
            {
              caption: 'Dashboard',
              path: '/dashboard',
              icon: <FaTelevision />
            },
            {
              caption: 'Orders',
              path: '/admin/orders',
              icon: <MdAddShoppingCart />
            },
            {
              caption: 'Products',
              path: '/admin/products',
              icon: <FaCartArrowDown />
            },
            {
              caption: 'Reports',
              path: '/admin/reports',
              icon: <MdInsertChart />
            },
            {
              caption: 'Reviews',
              path: '/admin/reviews',
              icon: <MdRateReview />
            },
            {
              caption: 'Settings',
              path: '/settings',
              icon: <MdSettings />
            },
          ].map(
            ({ caption, path, icon }, key ) => (
              <ListItem caption={ caption } key={ key }
                  className={
                  (path === location.pathname) ? 'Navigation--selected' : null
                  }
                  rightIcon={
                    (path === location.pathname) ?
                      <div>
                        {
                          icon
                        }
                        <MdKeyboardArrowLeft />
                      </div> :
                      icon
                  }
                  onClick={
                    () => {
                      history.push(path)
                    }
                  } />
            )
          )
        }
      </List>
    </NavDrawer>
    <Panel className="Navigation-panel">
      <AppBar className="Navigation-navbar"
              title={
                <div className={ navTitleClass }>
                  <span>ShopName</span> <br />
                  <span>Shop reference code</span>
                </div>
              }
              leftIcon={
                <Avatar
                  title="Shop_logo"
                  image={ logo }
                  className="Navbar--icon" />
              }
              onLeftIconClick={
                () => history.push('/')
              }
              fixed >
            <Autocomplete
              className={
                searchbarClass
              }
              placeholder="Search"
              id="search"
              value={''} >
              <IconButton
                icon={<MdClear />}
                onClick={ () => hideSearchbar() }
                className="Navigation-searchbar--close" />
            </Autocomplete>

            <Navigation type="horizontal" className="Right-comp">
              <IconButton
                className="Navigation-search--button"
                onClick={
                  () => showSearchbar()
                }
                icon={ <MdSearch /> }/>


              <IconMenu className="rewards" icon={
                <div>
                  <h2>Money 0.00</h2>
                  <h2>Rewards 0.00</h2>
                </div>
              }   >



              </IconMenu>

              <IconMenu icon="card_giftcard" className="GiftPoint">
                <MenuItem value='money' caption='Money' />
                <MenuItem value='reward' caption='Reward' />

              </IconMenu>


              <IconButton className="cart" icon={<MdCart />}/>


              <IconMenu icon={
                <Avatar title="Shop_logo" image={ logo }/>
              } position='topRight' className="profile-menu" menuRipple >
                {
                  (userLoggedIn) ?
                    <div>
                      <MenuItem value='dashboard' icon={
                      <MdDashboard/>
                      } onClick={() => history.push('/dashboard')} caption='Dashboard' />
                      <MenuItem value='profile' icon={
                        <MdProfile/>
                      } caption='Profile' />
                      <MenuItem value='settings' icon={
                        <MdSettings/>
                      } caption='Settings' />
                      <MenuDivider />
                      <MenuItem value='signout' icon={
                        <MdSignout/>
                      } onClick={ () => history.push('/') }
                        caption='Sign Out' />
                    </div> :
                    <MenuItem value='signin'
                              icon='account_circle'
                              onClick={ handleSignIn }
                              caption='Sign In/Sign Up' />
                }
              </IconMenu>
            </Navigation>
      </AppBar>
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
>>>>>>> Stashed changes

Nav.propTypes = {
}

export default Nav;
