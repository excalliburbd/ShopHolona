import React, { PropTypes } from 'react';
import classNames from 'classnames';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Layout from 'react-toolbox/lib/layout/Layout';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';

import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';


import MdStar from 'react-icons/lib/md/star';
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import FaTelevision from 'react-icons/lib/fa/television';
import MdAddShoppingCart from 'react-icons/lib/md/add-shopping-cart';
import FaCartArrowDown from 'react-icons/lib/fa/cart-arrow-down';
import MdInsertChart from 'react-icons/lib/md/insert-chart';
import MdRateReview from 'react-icons/lib/md/rate-review';
import MdSettings from 'react-icons/lib/md/settings';
import MdProfile from 'react-icons/lib/md/account-circle';
import MdSignout from 'react-icons/lib/md/power-settings-new';
import MdCart from 'react-icons/lib/md/shopping-cart';
import MdDashboard from 'react-icons/lib/fa/dashboard';
import MdSearch from 'react-icons/lib/md/search';
import MdClear from 'react-icons/lib/md/clear';


import FilterBarContainer from '../containers/FilterBarContainer';

import './Navigation.css';

import logo from '../assets/images/logo/logo.png';

const Nav = ({
  location,
  history,
  searchbar,
  showSearchbar,
  hideSearchbar,
  children
}) => {

  let pinned = true;

  if('/' === location.pathname) {
    pinned = false;
  }

  const navTitleClass = classNames({
    'Navigation-title--hidden': searchbar,
  })

  const searchbarClass = classNames({
    'Searchbar': true,
    'Searchbar--hide': !searchbar,
  })

  return <Layout className="Navigation">
    {
      <NavDrawer pinned={ pinned } >
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
                caption: 'Order',
                path: '/order',
                icon: <MdAddShoppingCart />
              },
              {
                caption: 'Products',
                path: '/products',
                icon: <FaCartArrowDown />
              },
              {
                caption: 'Reports',
                path: '/reports',
                icon: <MdInsertChart />
              },
              {
                caption: 'Reviews',
                path: '/reviews',
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
    }
    <Panel className="Navigation-panel">
      <AppBar className="Navbar"
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
              <IconButton icon={<MdCart />}/>
              <IconMenu icon={
                <Avatar title="Shop_logo" image={ logo }/>
              } position='topRight' className="profile-menu" menuRipple >
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
                } caption='Sign Out' disabled />
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
  </Layout>
};

Nav.prototype = {
  pinned: PropTypes.bool.isRequired
}

export default Nav;
