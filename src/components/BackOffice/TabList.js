import React from 'react';
import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

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
