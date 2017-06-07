import React from 'react';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
// import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

import './TabList.css';

const TabList = ({
  menu,
  route,
  tabIndex,
  handleTabChange,
  dropdownOptions,
  handleDropdownChange,
  data,
  handleShowProductDetails,
  vendor,
}) => {
  return (
    <Tabs index={ tabIndex }
          onChange={
            index => handleTabChange(index, route)
          }>
        {
          menu.map(
            ({ name, products }, key) => (
                <Tab label={ `${ name } (${ products.length })` } key={ key } >
                  {
                    <Card  className="TabList-card TabList-card--titles" key={ key }>
                        <CardText  className="TabList-data">
                          {
                              data[0].map(
                                ( field, key) => (
                                  <span key={ key } style={{ flex: 1 / data[0].length }}
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

                    data[tabIndex + 1].map(
                      (info, key) => (
                        <Card  className="TabList-card" key={ key }
                               onClick={
                                 () => {
                                   handleShowProductDetails(vendor, products[key]);
                                 }
                               }>
                          <CardText  className="TabList-data">
                            {
                              info.map(
                                    ({field, value}, key) => {
                                        switch(field){
                                          case 'Image':
                                           return <span key={ key } style={{ flex: 1 / data[0].length }} className="TabList-data--row">
                                                    <span>{ field }</span>
                                                    <span>
                                                      <div style={{
                                                              backgroundImage: `url(${value})`,
                                                            }} className="TabList-card--preview"/>
                                                    </span>
                                                  </span>
                                          case 'Status':
                                            return <span key={ key } style={{ flex: 1 / data[0].length }} className="TabList-data--row">
                                                      <span>{ field }</span>
                                                      <span>{ value }</span>
                                                    </span>
                                          default:
                                            return <span key={ key } style={{ flex: 1 / data[0].length }} className="TabList-data--row">
                                                      <span>{ field }</span>
                                                      <span>{ value }</span>
                                                    </span>
                                        }
                                    }
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
