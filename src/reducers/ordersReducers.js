import moment from 'moment';

export const OrdersReducer = (
  state = [1, 2, 3, 4] , action
) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const OrdersEntityReducer = (
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
