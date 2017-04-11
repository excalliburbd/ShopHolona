import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import Card from 'react-toolbox/lib/card/Card';

import FaTelevision from 'react-icons/lib/fa/television';

import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import './FilterBar.css';
import './Datepicker.css';

const FilterBar = ({ 
  show,
  flat,
  route,
  fromDate,
  fromValue,
  toDate,
  toValue,
  enteredToDate,
  showOverlay,
  handleInputFocus,
  handleSetFromDate,
  handleSetToDate,
  handleDayClick,
  handleDayMouseEnter,
  children 
}) => {

  const filterBarClass = classNames({
    FilterBar,
    'FilterBar--none': !show,
  });

  const overlayClass = classNames({
    'Datepicker-overlay': true,
    'Datepicker-overlay--show': showOverlay,
  })

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

  const status = {
    fromInput: null,
    toInput: null,
    daypicker: null,
    clickedInside: false,
    clickTimeout: null,
  }

  const isSelectingFirstDay = (day) => {
    const firstDayIsNotSelected = !fromDate;
    const selectedDayIsBeforeFirstDay = day < fromDate;
    const rangeIsSelected = fromDate && toDate;
    return firstDayIsNotSelected || selectedDayIsBeforeFirstDay || rangeIsSelected;
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
        <div onMouseDown={ () => {
              status.clickedInside = true;
              // The input's onBlur method is called from a queue right after onMouseDown event.
              // setTimeout adds another callback in the queue, but is called later than onBlur event
              status.clickTimeout = setTimeout(() => {
                status.clickedInside = false;
                }, 0);
              }
            }>
          <input
            type="text"
            ref={ (el) => { status.fromInput = el; } }
            placeholder="DD/MM/YYYY"
            value={ fromValue }
            onChange={ event => {
              const { value } = event.target;
              const momentDay = moment(value, 'L', true);
              if (momentDay.isValid()) {
                handleSetFromDate(momentDay.toDate(), value);
              } else {
                handleSetFromDate(null, value);
              }
            }}
            onFocus={ () => handleInputFocus(true) }
            onBlur={ () => {
              const showOverlay = status.clickedInside;

              handleInputFocus(showOverlay)

              // Force input's focus if blur event was caused by clicking on the calendar
              if (showOverlay) {
                status.fromInput.focus();
              }
            }}
          />
          <input
            type="text"
            ref={ (el) => { status.toInput = el; } }
            placeholder="DD/MM/YYYY"
            value={ toValue }
            onChange={ event => {
              const { value } = event.target;
              const momentDay = moment(value, 'L', true);
              if (momentDay.isValid()) {
                handleSetToDate(momentDay.toDate(), value);
              } else {
                handleSetToDate(null, value);
              }
            }}
            onFocus={ handleInputFocus }
            onBlur={ () => {
              const showOverlay = status.clickedInside;

              handleInputFocus(showOverlay)

              // Force input's focus if blur event was caused by clicking on the calendar
              if (showOverlay) {
                status.toInput.focus();
              }
            }}
          />
          <div className="Datepicker-container">
            <div className={ overlayClass }>
              <DayPicker                  
                numberOfMonths={ 2 }
                fromMonth={ fromDate }
                selectedDays={ [fromDate, { fromDate, to: enteredToDate }] }
                disabledDays={ { before: fromDate } }
                modifiers={ { start: fromDate, end: enteredToDate } }
                onDayClick={ day => {
                  handleDayClick(day);
                  if(isSelectingFirstDay(day)) {
                    status.fromInput.blur();
                  } else {
                    status.toInput.blur();
                  }
                }}
                onDayMouseEnter={ day => handleDayMouseEnter(day) }
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
}

export default FilterBar;
