import React from 'react';
import moment from 'moment';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
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

import MdRateReview from 'react-icons/lib/md/rate-review';

import './TabList.css';

const TabList = ({
  menu,
  route,
  tabIndex,
  handleTabChange,
  dropdownOptions,
  handleDropdownChange,
  data,
}) => {
  return (
    <Tabs index={ tabIndex }
            onChange={
              index => handleTabChange(index, route)
            }>
        {
          menu.map(
            ({ label, amount }, key) => (
                <Tab label={ `${ label } (${ amount})` } key={ key } >
                  {
                    <Card  className="TabList-card TabList-card--titles" key={ key }>
                        <CardText  className="TabList-data">
                          {
                              data[0][0][`${route}Arr`].map(
                                ({field, value}, key) => (
                                  <span key={ key } style={{ flex: 1 / 6}}
                                        className="TabList-data--row TabList-data--row--title">
                                    <span>{ field }</span>
                                  </span>
                                )
                              )
                          }
                        </CardText>
                      </Card>
                  }
                  {

                    data[key].map(
                      (info, key) => (
                        <Card  className="TabList-card" key={ key }>
                          <CardText  className="TabList-data">
                            {
                              info[`${route}Arr`].map(
                                    ({field, value}, key) => (
                                      (field !== 'Status')?
                                        <span key={ key } style={{ flex: 1 / 6}} className="TabList-data--row">
                                          <span>{ field }</span>
                                          <span>{ value }</span>
                                        </span> :
                                        <span key={ key } style={{ flex: 1 / 6}} className="TabList-data--row">
                                          <span>{ field }</span>
                                          <span>
                                            <Dropdown source={ dropdownOptions }
                                                      onChange={
                                                        value => handleDropdownChange(value, info[`${route}ID`])
                                                      }
                                                      className="TabList-dropdown"
                                                      value={ value } />
                                          </span>
                                        </span>
                                    )
                                  )
                            }
                            </CardText>
                          </Card>
                      )
                    )
                  }
                </Tab>
            )
          )
        }
      </Tabs>
  );
}

export default TabList;
