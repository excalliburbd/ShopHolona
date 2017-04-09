import React from 'react';
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


const Dashboard = ({ history }) => (
  <div className="Dashboard" >
    <Card onClick={
      () => {
        history.push('/reports');
      }
    }>
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
    <Card onClick={
      () => {
        history.push('/products');
      }
    }>
      <CardTitle avatar={
        <FaCartArrowDown height="1.5em" width="1.5em"  style={{marginRight: '.5em'}} /> }
        title="Products" />

    </Card>
    <Card onClick={
      () => {
        history.push('/orders');
      }
    }>
      <CardTitle avatar={
        <MdAddShoppingCart height="1.5em" width="1.5em"  style={{marginRight: '.5em'}} /> }
        title="Orders" />

    </Card>
    <Card onClick={
      () => {
        history.push('/reviews');
      }
    }>
      <CardTitle avatar={
        <MdRateReview height="1.5em" width="1.5em"  style={{marginRight: '.5em'}} /> }
        title="Reviews" />

    </Card>
  </div>
);

export default Dashboard;
