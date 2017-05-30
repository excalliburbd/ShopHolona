import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';

import MdInsertChart from 'react-icons/lib/md/insert-chart';
import MdAddShoppingCart from 'react-icons/lib/md/add-shopping-cart';
import MdRateReview from 'react-icons/lib/md/rate-review';
import FaCartArrowDown from 'react-icons/lib/fa/cart-arrow-down';
import MdStar from 'react-icons/lib/md/star';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './Dashboard.css';

const data = [
  {name: 'date1', Orders: 24},
  {name: 'date2', Orders: 13},
  {name: 'date3', Orders: 98},
  {name: 'date4', Orders: 39},
  {name: 'date5', Orders: 48},
  {name: 'date6', Orders: 38},
  {name: 'date7', Orders: 43},
];

const Dashboard = ({
  procudctsStatus,
  ordersStatus,
  reviewsStatus,
  history, //from react-router Route
}) => (
  <div className="Dashboard" >
    <Card className="Dahsboard-report">
      <CardTitle avatar={
        <MdInsertChart height="1.5em" width="1.5em"  style={{marginRight: '.5em'}} /> }
        title="Reports" onClick={
          () => {
            history.push('/admin/reports');
          }
        } />
      <div className="Dashboard-chart">
        <ResponsiveContainer height="100%">
          <BarChart width={600} height={300} data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="Orders" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
    <Card >
      <CardTitle avatar={
        <MdStar height="1.5em" width="1.5em"  style={{marginRight: '.5em'}} /> }
        title="Featured Product" />

    </Card>
    {
      [
        {
          caption: 'Products',
          path: '/admin/products',
          icon: FaCartArrowDown,
          status: procudctsStatus
        },
        {
          caption: 'Orders',
          path: '/admin/order',
          icon: MdAddShoppingCart,
          status: ordersStatus
        },
        {
          caption: 'Reviews',
          path: '/admin/reviews',
          icon: MdRateReview,
          status: reviewsStatus
        },
      ].map(
        ({ caption, path, icon, status }, key) => (
          <Card onClick={
            () => {
              history.push(path);
            }
          } key={ key } >
            <CardTitle avatar={
              <icon height="1.5em" width="1.5em"  style={{marginRight: '.5em'}} /> }
              title={ caption } />
            <CardText>
              <ul className="Dashboard-list">
                {
                  status.map(
                    ({ lable, amount }, key) => (
                      <li key={ key }>
                        <span>{ lable }</span>
                        <span>{ amount }</span>
                      </li>
                    )
                  )
                }
              </ul>
            </CardText>
          </Card>
        )
      )
    }
  </div>
);

Dashboard.propTypes = {
  procudctsStatus: PropTypes.array,
}

export default Dashboard;
