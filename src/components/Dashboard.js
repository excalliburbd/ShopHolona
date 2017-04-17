import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';

import MdInsertChart from 'react-icons/lib/md/insert-chart';
import MdAddShoppingCart from 'react-icons/lib/md/add-shopping-cart';
import MdRateReview from 'react-icons/lib/md/rate-review';
import FaCartArrowDown from 'react-icons/lib/fa/cart-arrow-down';
import MdStar from 'react-icons/lib/md/star';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './Dashboard.css';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];


const Dashboard = ({
  procudctsStatus,
  ordersStatus,
  reviewsStatus,
  history, //from react-router Route
}) => (
  <div className="Dashboard" >
    <Card onClick={
            () => {
              history.push('/reports');
            }
          }
          className="Dahsboard-report" >
      <CardTitle avatar={
        <MdInsertChart height="1.5em" width="1.5em"  style={{marginRight: '.5em'}} /> }
        title="Reports" />
      <div className="Dashboard-chart">
        <ResponsiveContainer height="100%">
          <LineChart data={data} margin={{right: 16}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
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
