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

const FilterBar = ({ show, children }) => {

  const filterBarClass = classNames({
    FilterBar,
    'FilterBar--none': show,
  });

  return <div className={ filterBarClass } >
    <Card>
      <CardTitle avatar={ <FaTelevision height="2em" width="2em" /> } title="Dashboard" />
      <div className="FilterBar-filters">
        <DateRangePicker />
        <div />
      </div>
    </Card>
  </div>
}

export default FilterBar;
