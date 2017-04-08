import React, { PropTypes } from 'react';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Layout from 'react-toolbox/lib/layout/Layout';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';

import MdStar from 'react-icons/lib/md/star';
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import FaTelevision from 'react-icons/lib/fa/television';
import MdAddShoppingCart from 'react-icons/lib/md/add-shopping-cart';
import FaCartArrowDown from 'react-icons/lib/fa/cart-arrow-down';
import MdInsertChart from 'react-icons/lib/md/insert-chart';
import MdRateReview from 'react-icons/lib/md/rate-review';
import MdSettings from 'react-icons/lib/md/settings';

import FilterBar from './FilterBar';

import './Navigation.css';


const Navigation = ({ location, history, pinned, children }, context) => {

  if('/' === location.pathname) {
    pinned = false;
  }

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
              ({ caption, path, icon }) => (
                <ListItem caption={ caption }
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
                <div>
                  <span>ShopName</span> <br />
                  <span>Shop reference code</span>
                </div>
              }
              leftIcon={
                <MdStar />
              }
              rightIcon={
                <MdStar />
              }
              onRightIconClick={
                () => {
                  history.push('/dashboard')
                }
              }
              fixed>
      </AppBar>
      <div className="Navigation-content">
        <FilterBar show={ ('/' === location.pathname) } />
        { children }
      </div>
    </Panel>
  </Layout>
};

Navigation.prototype = {
  pinned: PropTypes.bool.isRequired
}

export default Navigation;
