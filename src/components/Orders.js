import React from 'react';
import moment from 'moment';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';

import MdRateReview from 'react-icons/lib/md/rate-review';

import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import Menu from 'react-toolbox/lib/menu/Menu';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

import './Orders.css';

const Orders = ({
  menu,
  index,
  handleTabChange,
  values = [ 1,'gif','Great Product','Out Of Stock', 119, 1, ['Great', 'nyc'], moment.now()],
}) => (
   <Tabs index={ index }
          onChange={
            index => handleTabChange(index)
          }>
      {
        menu.orders.map(
          ({ lable, amount }, key) => (
              <Tab label={ lable + '(' + amount + ')'  } key={ key } >
                <Card  className="BackOffice-card BackOffice-card--titles">
                  <CardText  className="BackOffice-data">
                    {
                      [ 'Date', 'Order#', 'Amount', 'Revenue', 'Priority', 'Status']
                        .map(
                          (field, key) => (
                            <span key={ key }
                                  className="BackOffice-data--row BackOffice-data--row--title"
                                  style={{ flex: 1 / 6}}
                                  >
                              <span>{ field }</span>
                            </span>
                          )
                        )
                    }
                  </CardText>
                </Card>

                <Card  className="BackOffice-card">
                  <CardText  className="BackOffice-data">
                    {
                      [ 'Date', 'Order#', 'Amount', 'Revenue', 'Priority', 'Status']
                        .map(
                          (field, key) => (
                            (field !== 'Status')?
                              <span key={ key } style={{ flex: 1 / 6}} className="BackOffice-data--row">
                                <span>{ field }</span>
                                <span>{ values[key] }</span>
                              </span> :
                              <span key={ key } style={{ flex: 1 / 6}} className="BackOffice-data--row">
                                <span>{ field }</span>
                                <span>
                                  <Dropdown source={[
                                                      {
                                                        value: 1,
                                                        label: 'Active'
                                                      },
                                                      {
                                                        value: 2,
                                                        label: 'Passive'
                                                      },
                                                      {
                                                        value: 3,
                                                        label: 'Default'
                                                      }
                                                    ]}
                                            className="Orders-dropdown"
                                            value={1} />
                                </span>
                              </span>
                          )
                        )
                    }
                  </CardText>
                </Card>
              </Tab>
          )
        )
      }
    </Tabs>
);

export default Orders;
