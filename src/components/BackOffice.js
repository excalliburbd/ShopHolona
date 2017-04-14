import React, { PropTypes } from 'react';
import moment from 'moment';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import MdRateReview from 'react-icons/lib/md/rate-review';

import './BackOffice.css';

const BackOffice = ({
  match,
  location,
  history,
  menu,
  index,
  handleTabChange,
  values = [ 1,'gif','Great Product','Out Of Stock', 119, 1, ['Great', 'nyc'], moment.now()],
}) => (
  <div className="Backoffice">
    <Tabs index={ index }
          onChange={
            index => handleTabChange(index)
          }>
      {
        menu.products.map(
          ({ lable, amount }, key) => (
              <Tab label={ lable + '(' + amount + ')'  } key={ key } >
                <Card  className="BackOffice-card BackOffice-card--titles">
                  <CardText  className="BackOffice-data">
                    {
                      [ 'Number', 'Image', 'Name', 'Status', 'Price', 'Views', 'Tags', 'Date']
                      .map(
                        (field, key) => (
                          <span key={ key }
                                className="BackOffice-data--row BackOffice-data--row--title">
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
                      [ 'Number', 'Image', 'Name', 'Status', 'Price', 'Views', 'Tags', 'Date']
                        .map(
                          (field, key) => (
                            <span key={ key } className="BackOffice-data--row">
                              <span>{ field }</span>
                              <span>{ values[key] }</span>
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
  </div>
);

BackOffice.proptypes = {
  menu: PropTypes.array.isRequired,
}

export default BackOffice;

 /*<div>
            <span>Date:</span>
            <span>{ moment.now() }</span>
          </div>
          <div>
            <span>Order Number:</span>
            <span>1323 </span>
          </div>
          <div>
            <span>Items:</span>
            <span></span>
          </div>
          <div>
            <span>Ammount:</span>
            <span>12</span>
          </div>
          <div>
            <span>Status:</span>
            <span>Completed</span>
          </div>*/
