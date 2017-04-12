import { combineReducers } from 'redux';
import moment from 'moment';
import { DateUtils } from 'react-day-picker';

const isSelectingFirstDay = (from, to, day) => {
  const firstDayIsNotSelected = !from;
  const selectedDayIsBeforeFirstDay = day < from;
  const rangeIsSelected = from && to;
  return firstDayIsNotSelected || selectedDayIsBeforeFirstDay || rangeIsSelected;
}

const FilterUIReducer = (state = {
  date: {
    from: null,
    fromValue: '',
    to: null,
    toValue: '',
    enteredTo: null,
    overlay: false,
  }
}, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER_DATE_DATE':
      if (DateUtils.isSameDay(action.day, state.date.from)) {
        return {
          ...state,
          date: {
            from: null,
            to: null,
            enteredTo: null,
          },
        }
      }

      if (isSelectingFirstDay(state.date.from, state.date.to, action.day)) {
        return {
          ...state,
          date: {
            from: action.day,
            fromValue: moment(action.day).format('L'),
            to: null,
            toValue: '',
            enteredTo: null,
          },
        }
      } else {
        return {
          ...state,
          date: {
            ...state.date,
            to: action.day,
            toValue: moment(action.day).format('L'),
            enteredTo: action.day,
          },
        }
      }
    case 'CHANGE_FILTER_DATE_MOUSE_ENTER':
      if (!isSelectingFirstDay(state.date.from, state.date.to, action.day)) {
        return {
          ...state,
          date: {
            ...state.date,
            enteredTo: action.day,
          },
        }
      }
      return state;
    case 'CHANGE_FILTER_DATE_CHANGE_OVERLAY':
      return {
        ...state,
        date: {
          ...state.date,
          overlay: action.status,
        },
      }
    case 'CHANGE_FILTER_DATE_SET_FROM':
      return {
        ...state,
        date: {
          ...state.date,
          from: action.day,
          fromValue: action.value,
        },
      }
    case 'CHANGE_FILTER_DATE_SET_TO':
      return {
        ...state,
        date: {
          ...state.date,
          to: action.day,
          toValue: action.value,
        },
      }
    default:
      break;
  }

  return state;
}

const NavigationUIReducer = (
  state = {
    searchbar: false,
  }, action
) => {
  switch (action.type) {
    case 'SHOW_NAVIGATION_SEARCHBAR':
     return {
       ...state,
       searchbar: true,
     }
    case 'HIDE_NAVIGATION_SEARCHBAR':
     return {
       ...state,
       searchbar: false,
     }
    default:
      return state;
  }
}

const RootReducer = combineReducers({
  ui: combineReducers({
    filter: FilterUIReducer,
    nav: NavigationUIReducer,
  })
});

export default RootReducer;
