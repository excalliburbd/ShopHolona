import React from 'react';
import { ResponsiveContainer, BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';

import MdInsertChart from 'react-icons/lib/md/insert-chart';

import './Reports.css';

const ordersData = [
  {name: 'date1', Orders: 0},
  {name: 'date2', Orders: 0},
  {name: 'date3', Orders: 0},
  {name: 'date4', Orders: 0},
  {name: 'date5', Orders: 0},
  {name: 'date6', Orders: 0},
  {name: 'date7', Orders: 0},
];

const revenueData = [
  {name: 'date1', revenue: 0},
  {name: 'date2', revenue: 0},
  {name: 'date3', revenue: 0},
  {name: 'date4', revenue: 0},
  {name: 'date5', revenue: 0},
  {name: 'date6', revenue: 0},
  {name: 'date7', revenue: 0},
];

const CustomizedDot = (props) => {
  const {cx, cy, value} = props;

  if (value > 3000) {
    return (
      <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="#003366" viewBox="0 0 1024 1024">
        <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z"/>
      </svg>
    );
  }

  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="#cc3333" viewBox="0 0 1024 1024">
      <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z"/>
    </svg>
  );
}

const Reports = () => (
  <div className="report">
    <Card className="report-cards">
      <CardTitle avatar={
        <MdInsertChart height="1.5em" width="1.5em"  style={{marginRight: '.5em'}} /> }
                 title="Orders" />
      <div className="orders-chart">
        <ResponsiveContainer>
          <BarChart width={600} height={300} data={ordersData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis/>
            <YAxis/>
            <CartesianGrid strokeDasharray="1 1"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="Orders" fill="#003366" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </Card>
    <Card  className="report-cards">
      <CardTitle avatar={
        <MdInsertChart height="1.5em" width="1.5em"  style={{marginRight: '.5em'}} /> }
                 title="Revenue" />
      <div className="revenue-chart">
        <ResponsiveContainer>
          <LineChart width={600} height={300} data={revenueData}
                     margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis/>
            <YAxis/>
            <CartesianGrid strokeDasharray="1 1"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#003366" activeDot={<CustomizedDot />}/>

          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>

  </div>
);

export default Reports;
