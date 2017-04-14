import React from 'react';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';

import MdRateReview from 'react-icons/lib/md/rate-review';

import './BackOffice.css';

const BackOffice = ({
  match,
  location,
  history,
  menu,
}) => (
  <div className="Backoffice">
    <List className="Backoffice--menuelist" selectable ripple>
      {
        menu.map(
          ({ lable, amount }, key) => (
            <ListItem itemContent={
                        <span className="Backoffice-listitem" >
                          <span>{ lable }</span>
                          <span>{ '(' + amount + ')' }</span>
                        </span>
                      }
                      key={ key } />
          )
        )
      }
    </List>
    <div className="BackOffice-data" >
    </div>
  </div>
);

BackOffice.proptype

export default BackOffice;
