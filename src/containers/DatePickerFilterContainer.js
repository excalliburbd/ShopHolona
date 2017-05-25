import { connect } from 'react-redux';

import DatePickerFilter from '../components/Filter/DatePickerFilter';

const mapStateToProps = state => {
  return {
    fromDate: state.ui.filter.date.from,
    fromValue: state.ui.filter.date.fromValue,
    toDate: state.ui.filter.date.to,
    toValue: state.ui.filter.date.toValue,
    enteredToDate: state.ui.filter.date.enteredTo,
    showOverlay: state.ui.filter.date.overlay,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDayClick: day => {
      dispatch({
        type: 'CHANGE_FILTER_DATE_DATE',
        day,
      })
    },
    handleDayMouseEnter: day => {
      dispatch({
        type: 'CHANGE_FILTER_DATE_MOUSE_ENTER',
        day,
      })
    },
    handleInputFocus: status => {
      dispatch({
        type: 'CHANGE_FILTER_DATE_CHANGE_OVERLAY',
        status,
      })
    },
    handleSetFromDate: (day, value) => {
      dispatch({
        type: 'CHANGE_FILTER_DATE_SET_FROM',
        day,
        value,
      })
    },
    handleSetToDate: (day, value) => {
      dispatch({
        type: 'CHANGE_FILTER_DATE_SET_TO',
        day,
        value,
      })
    }
  }
}

const DatePickerFilterContainer = connect(mapStateToProps, mapDispatchToProps)(DatePickerFilter);

export default DatePickerFilterContainer;
