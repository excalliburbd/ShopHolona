import moment from 'moment';

export const ProductsReducer = (
  state = [1, 2, 3, 4] , action
) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const ProductsEntityReducer = (
  state = {
    1: [
      {
        value: moment().format('DD-MM-YYYY'),
        field: '#',
      },
      {
        value: 1,
        field: 'Name',
      },
      {
        value: 'Mr. X',
        field: 'Price',
      },
      {
        value: 123,
        field: 'Views',
      },
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Tags',
      },
      {
        value: 1,
        field: 'Date Added',
      },
    ],
    1: [
      {
        value: moment().format('DD-MM-YYYY'),
        field: '#',
      },
      {
        value: 1,
        field: 'Name',
      },
      {
        value: 'Mr. X',
        field: 'Price',
      },
      {
        value: 123,
        field: 'Views',
      },
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Tags',
      },
      {
        value: 1,
        field: 'Date Added',
      },
    ],
    2: [
      {
        value: moment().format('DD-MM-YYYY'),
        field: '#',
      },
      {
        value: 1,
        field: 'Name',
      },
      {
        value: 'Mr. X',
        field: 'Price',
      },
      {
        value: 123,
        field: 'Views',
      },
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Tags',
      },
      {
        value: 1,
        field: 'Date Added',
      },
    ],
    3: [
      {
        value: moment().format('DD-MM-YYYY'),
        field: '#',
      },
      {
        value: 1,
        field: 'Name',
      },
      {
        value: 'Mr. X',
        field: 'Price',
      },
      {
        value: 123,
        field: 'Views',
      },
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Tags',
      },
      {
        value: 1,
        field: 'Date Added',
      },
    ],
    4: [
      {
        value: moment().format('DD-MM-YYYY'),
        field: '#',
      },
      {
        value: 1,
        field: 'Name',
      },
      {
        value: 'Mr. X',
        field: 'Price',
      },
      {
        value: 123,
        field: 'Views',
      },
      {
        value: moment().format('DD-MM-YYYY'),
        field: 'Tags',
      },
      {
        value: 1,
        field: 'Date Added',
      },
    ],
  }, action
) => {
  switch (action.type) {
    default:
      return state;
  }
}
