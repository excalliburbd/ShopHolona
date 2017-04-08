import React from 'react';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';

import MdInsertChart from 'react-icons/lib/md/insert-chart';


const Dashboard = () => (
  <div>
    <Card>
      <CardTitle avatar={ <MdInsertChart height="2em" width="2em" /> } title="Reports" />
      <div className="Dashboard-chart">
      </div>
    </Card>
  </div>
);

export default Dashboard;
