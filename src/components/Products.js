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

const Products = ({
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
);

export default Products;
