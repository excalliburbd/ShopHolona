import React from 'react';
import classNames from 'classnames';

import Card from 'react-toolbox/lib/card/Card';

import FaTelevision from 'react-icons/lib/fa/television';

import DatePickerFilterContainer from '../containers/DatePickerFilterContainer';

import 'react-day-picker/lib/style.css';

import './FilterBar.css';

const FilterBar = ({
  show,
  flat,
  route,
  children
}) => {

  const filterBarClass = classNames({
    FilterBar,
    'FilterBar--none': !show,
  });

  const reportsClass = classNames({
    'FilterBar-card': true,
    'FilterBar--flat': (show && flat)
  })

  let routeName = 'Dashboard';

  switch (route) {
    case '/dashboard':
     routeName = 'Dashboard';
     break;
    case '/admin/order':
     routeName = 'Order';
     break;
    case '/admin/products':
     routeName = 'Products';
     break;
    case '/admin/reports':
     routeName = 'Reports';
     break;
    case '/admin/reviews':
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
    <Card className={ reportsClass }>
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
       <DatePickerFilterContainer />
      </div>
    </Card>
  </div>
}

export default FilterBar;
