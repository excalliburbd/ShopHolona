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
  handleShowOrderDetails,
  vendor,
}) => {

  const getListStyle = length => ({ flex: 1 / length });

  return (
    <Tabs index={ tabIndex }
          onChange={
            index => handleTabChange(index, route)
          }>
        {
          menu.map(
            ({ name, items }, key) => (
                <Tab label={ `${ name } (${ items.length })` } key={ key } >
                  {
                    <Card  className="TabList-card TabList-card--titles" key={ key }>
                        <CardText  className="TabList-data">
                          {
                              data[tabIndex].maping.map(
                                ( field, key) => (
                                  <span key={ key }
                                        style={ getListStyle(data[tabIndex].maping.length) }
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

                    data[tabIndex].content.map(
                      (info, key) => (
                        <Card  className="TabList-card" key={ key }
                               onClick={
                                 () => {
                                   if (route === 'products') {
                                    handleShowProductDetails(vendor, items[key]);
                                   }

                                   if (route === 'orders') {
                                    handleShowOrderDetails(items[key].id);
                                   }
                                 }
                               }>
                          <CardText  className="TabList-data">
                            {
                              info.map(
                                    ({field, value}, key) => {
                                        switch(field){
                                          case 'Image':
                                            return <span key={ key } style={getListStyle(data[tabIndex].maping.length)} className="TabList-data--row">
                                                    {<span>{ field }</span>}
                                                    <span>
                                                      <div style={{
                                                              backgroundImage: `url(${value})`,
                                                            }} className="TabList-card--preview"/>
                                                    </span>
                                                  </span>
                                          case 'Status':
                                            return <span key={ key } style={getListStyle(data[tabIndex].maping.length)} className="TabList-data--row">
                                                      {<span>{ field }</span>}
                                                      {<span>{ value }</span>}
                                                    </span>
                                          default:
                                            return <span key={ key } style={getListStyle(data[tabIndex].maping.length)} className="TabList-data--row">
                                                      {<span>{ field }</span>}
                                                      {<span>{ value }</span>}
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
