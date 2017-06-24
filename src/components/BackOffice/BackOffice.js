import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import TabList from './TabList';
import Reports from './Reports';

import './BackOffice.css';

const BackOffice = ({
  menu,
  tabIndex,
  data,
  handleTabChange,
  options,
  setOrderStatus,
  handleShowProductDetails,
  vendor,
}) => {
  return (
    <div className="Backoffice">
      <Switch>
        <Route exact path="/admin/orders" render={
                    () => <TabList  menu={ menu.orders }
                                    route="orders"
                                    data={ data.orders }
                                    tabIndex={ tabIndex.orders }
                                    handleTabChange={ handleTabChange }
                                    handleShowProductDetails={ handleShowProductDetails }
                                    vendor={ vendor }/>
                                    } />
        <Route exact path="/admin/products" render={
                    () => <TabList  menu={ menu.products }
                                    route="products"
                                    data={ data.products }
                                    tabIndex={ tabIndex.products }
                                    handleTabChange={ handleTabChange }
                                    handleShowProductDetails={ handleShowProductDetails }
                                    vendor={ vendor }/>
                                    } />
        <Route exact path="/admin/reports" component={ Reports } />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

BackOffice.proptypes = {
  menu: PropTypes.array.isRequired,
}

export default BackOffice;
