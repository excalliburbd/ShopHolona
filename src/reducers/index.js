import { combineReducers } from 'redux';
import moment from 'moment';

import FilterUIReducer from './FilterUIReducer';

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

const backOfficeUIReducer = (
  state = {
    menu: {
      products: [
        {
          label: 'All',
          amount: 12,
        },
        {
          label: 'Featured',
          amount: 2,
        },
        {
          label: 'Live',
          amount: 4,
        },
        {
          label: 'Out of Stock',
          amount: 3,
        },
        {
          label: 'Pending Review',
          amount: 0,
        },
      ],
      orders: [
        {
          value: 0,
          label: 'All',
        },
        {
          value: 1,
          label: 'Completed',
        },
        {
          value: 2,
          label: 'Pending',
        },
        {
          value: 3,
          label: 'Processing',
        },
        {
          value: 4,
          label: 'Cancelled',
        },
        {
          value: 5,
          label: 'Refund',
        },
        {
          value: 6,
          label: 'On Hold',
        },
      ]
    },
    selectedIndexs: {
      products: 0,
      orders: 0,
    },
  }, action
) => {
  switch (action.type) {
    case 'CHANGE_UI_TAB':
      return {
        ...state,
        selectedIndexs: {
          ...state.selectedIndexs,
          [action.route]: action.index
        }
      }
    default:
      return state;
  }
}

const UserReducer = (
  state = {
    isLoggedIn: false,
    token: null,
  }, action
) => {
  switch (action.type) {
    case 'USER_TRY_SIGNIN':
      return {
        ...state,
        isLoggedIn: true,
      }
    case 'USER_MANUAL_SIGNOUT':
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      }
    case 'USER_SET_TOKEN':
      return {
        ...state,
        token: action.token,
      }
    default:
      return state;
  }
}

const UserUIReducer = (
  state = {
    email: '',
    emailPassword: '',
    password: '',
    phonePassword: '',
    error: false,
  }, action
) => {
  switch (action.type) {
    case 'UPDATE_USER_UI_EMAIL':
      return {
        ...state,
        email: action.val,
      }
    case 'UPDATE_USER_UI_EMAIL_PASSWORD':
     return {
       ...state,
       emailPassword: action.val,
     }
    case 'UPDATE_USER_UI_PHONE_PASSWORD':
     return {
       ...state,
       phonePassword: action.val,
     }
    case 'UPDATE_USER_UI_PHONE':
      return {
        ...state,
        phone: action.val,
      }
    case 'SET_USER_UI_EMAIL_ERROR':
      return {
        ...state,
        email: '',
        emailPassword: '',
        error: true,
      }
    default:
      return state;
  }
}

const SidebarUIReducer = (
  state = {
    show: false,
    type: null,
  }, action
) => {
  switch (action.type) {
    case 'SHOW_SIDEBAR_SIGNIN':
      return {
        ...state,
        show: true,
        type: 'SIGNIN'
      }
    case 'HIDE_SIDEBAR':
      return {
        ...state,
        show: false,
        type: null,
      }
    default:
      return state;
  }
}

const OrdersReducer = (
  state = [1, 2, 3, 4] , action
) => {
  switch (action.type) {
    default:
      return state;
  }
}

const OrdersEntityReducer = (
  state = {
    1: [
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Date',
      },
      {
        value: 1,
        field: 'Order#',
      },
      {
        value: 'Mr. X',
        field: 'Customer',
      },
      {
        value: 123,
        field: 'Amount',
      },
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Due',
      },
      {
        value: 1,
        field: 'Status',
      },
    ],
    2: [
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Date',
      },
      {
        value: 1,
        field: 'Order#',
      },
      {
        value: 'Mr. X',
        field: 'Customer',
      },
      {
        value: 123,
        field: 'Amount',
      },
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Due',
      },
      {
        value: 3,
        field: 'Status',
      },
    ],
    3: [
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Date',
      },
      {
        value: 1,
        field: 'Order#',
      },
      {
        value: 'Mr. X',
        field: 'Customer',
      },
      {
        value: 123,
        field: 'Amount',
      },
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Due',
      },
      {
        value: 4,
        field: 'Status',
      },
    ],
    4: [
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Date',
      },
      {
        value: 1,
        field: 'Order#',
      },
      {
        value: 'Mr. X',
        field: 'Customer',
      },
      {
        value: 123,
        field: 'Amount',
      },
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Due',
      },
      {
        value: 4,
        field: 'Status',
      },
    ],
  }, action
) => {
  switch (action.type) {
    case 'UPDATE_ORDERS_DATA_STATUS':
      return {
        ...state,
        [action.id] : state[action.id].map(
          (val, key) => {
            if(key === (state[action.id].length - 1)) {
              return {
                ...val,
                value: action.value
              }
            }

            return val;
          }
        )
      }
    default:
      return state;
  }
}

const RootReducer = combineReducers({
  user: UserReducer,
  orders: OrdersReducer,
  entities: combineReducers({
    orders: OrdersEntityReducer,
  }),
  ui: combineReducers({
    filter: FilterUIReducer,
    nav: NavigationUIReducer,
    backOffice: backOfficeUIReducer,
    sidebar: SidebarUIReducer,
    user: UserUIReducer,
  })
});

export default RootReducer;
