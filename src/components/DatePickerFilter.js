import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import DayPicker from 'react-day-picker';

import MdRightArrow from 'react-icons/lib/md/arrow-forward';

import './Datepicker.css';

const DatePickerFilter = ({
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
}) => {
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

  const overlayClass = classNames({
    'Datepicker-overlay': true,
    'Datepicker-overlay--show': showOverlay,
  });

  return <div onMouseDown={ () => {
    status.clickedInside = true;
    // The input's onBlur method is called from a queue right after onMouseDown event.
    // setTimeout adds another callback in the queue, but is called later than onBlur event
    status.clickTimeout = setTimeout(() => {
      status.clickedInside = false;
      }, 0);
    }
      } className="Datepicker" >
    <input
      className="startDate"
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
    <MdRightArrow className="rightArrow"/>
    <input
      className="endDate"
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
}

export default DatePickerFilter;
