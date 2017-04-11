import React from 'react';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';

import './BackOffice.css';

const BackOffice = ({ match, location, history }) => (
  <div className="BackOffice">
    <List selectable ripple>
      <ListItem caption='list item' />
      <ListItem caption='Remove this publication' />
    </List>

    <div className="BackOffice-datatable" >
    </div>
  </div>
);

export default BackOffice;
