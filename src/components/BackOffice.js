import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';

import TabList from './TabList';
import Reports from './Reports';

import './BackOffice.css';

const BackOffice = ({
  menu,
  tabIndex,
  data,
  handleTabChange,
  options,
  setOrderStatus
}) => {

  const menuList = {
    orders: menu.orders.map(
              (status, key) => ({
                ...status,
                amount: data.orders[key].length
              })
            ),
    products: menu.products.map(
                (status, key) => ({
                  ...status,
                  amount: data.orders[key].length
                })
              )
  }

  return (
    <div className="Backoffice">
      <Route exact path="/admin/orders" render={
                  () => <TabList menu={ menuList.orders }
                                 route="order"
                                 dropdownOptions={
                                                    menu.orders.filter(
                                                      status => (status.label !== 'All')
                                                    )
                                                 }
                                 handleDropdownChange={ setOrderStatus }
                                 data={ data.orders }
                                 tabIndex={ tabIndex.orders }
                                 handleTabChange={ handleTabChange } />
                                } />
      <Route exact path="/admin/products" render={
                  () => <TabList menu={ menuList.products }
                                 route="product"
                                 dropdownOptions={
                                                    menu.products.filter(
                                                      status => (status.label !== 'All')
                                                    )
                                                 }
                                 data={ data.products }
                                 tabIndex={ tabIndex.products }
                                 handleTabChange={ handleTabChange } />
                                } />
      <Route exact path="/admin/reports" component={ Reports } />
    </div>
  );
}

BackOffice.proptypes = {
  menu: PropTypes.array.isRequired,
}

export default BackOffice;
