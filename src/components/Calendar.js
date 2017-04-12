import React from 'react';
import { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import MdRightArrow from 'react-icons/lib/md/arrow-forward';

import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(),
      endDate: null
    };
    console.log(this.state);
  }

  render() {
    return (
      <div className="portalDate">
        <DatePicker
          className="startDate"
          selected={this.state.startDate}
          onChange={this.handleStartDate.bind(this)}
        withPortal
        />

        <MdRightArrow className="rightArrow"/>

        <DatePicker
          className="endDate"
          placeholderText="End Date"
          selected={this.state.endDate}
          onChange={this.handleEndDate.bind(this)}
        withPortal
        />
      </div>

    );
  }

  handleStartDate(date) {
    this.setState({
      startDate: date



    });
  }

  handleEndDate(date) {
    this.setState({
      endDate: date

    });
  }

}

export default Calendar;



