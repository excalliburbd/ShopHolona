import React from 'react';

import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';

import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import FaTelevision from 'react-icons/lib/fa/television';
import MdAddShoppingCart from 'react-icons/lib/md/add-shopping-cart';
import FaCartArrowDown from 'react-icons/lib/fa/cart-arrow-down';
import MdInsertChart from 'react-icons/lib/md/insert-chart';
import MdRateReview from 'react-icons/lib/md/rate-review';
import MdSettings from 'react-icons/lib/md/settings';

import './NavigationDrawer.css';

const NavigationDrawer = ({
  pinned,
  history,
  location
}) => {
  return (
  <NavDrawer pinned={ pinned } className="Navigation-drawer">
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
);

}

export default NavigationDrawer;
