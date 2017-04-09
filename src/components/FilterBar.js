import React from 'react';
import classNames from 'classnames';

import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';

import FaTelevision from 'react-icons/lib/fa/television';

import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import './FilterBar.css';
import './Datepicker.css';

const FilterBar = ({ show, flat, route, children }) => {

  const filterBarClass = classNames({
    FilterBar,
    'FilterBar--none': !show,
  });

  let routeName = 'Dashboard';

  switch (route) {
    case '/dashboard':
     routeName = 'Dashboard';
     break;
    case '/order':
     routeName = 'Order';
     break;
    case '/products':
     routeName = 'Products';
     break;
    case '/reports':
     routeName = 'Reports';
     break;
    case '/reviews':
     routeName = 'Reviews';
     break;
    case '/settings':
     routeName = 'Settings';
     break;
    default:
     routeName = 'Dashboard';
     break;
  }

  return <div className={ filterBarClass } >
    <Card className={ (show && flat) ? 'FilterBar--flat' : null }>
      <div className="FilterBar--title">
        <FaTelevision
          height="1.5em"
          width="1.5em"
          style={{
            verticalAlign: 'text-bottom',
            marginRight: '.5em'
          }} />
        <span>{ routeName }</span>
      </div>
      <div className="FilterBar-filters">
        <div>
          <DateRangePicker />
        </div>
      </div>
    </Card>
  </div>
}

export default FilterBar;
