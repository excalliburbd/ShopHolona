import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

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
