import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';

import Products from './Products';
import Reports from './Reports';
import Orders from './Orders';

import './BackOffice.css';

const BackOffice = ({
  menu,
  index,
  handleTabChange,
}) => (
  <div className="Backoffice">
   <Route exact path="/admin/products" render={
      () => <Products menu={ menu } index={ index } handleTabChange={ handleTabChange } />
     } />
  <Route exact path="/admin/orders" render={
      () => <Orders menu={ menu } index={ index } handleTabChange={ handleTabChange } />
     } />
   <Route exact path="/admin/reports" component={ Reports } />
  </div>
);

BackOffice.proptypes = {
  menu: PropTypes.array.isRequired,
}

export default BackOffice;
