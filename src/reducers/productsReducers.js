import moment from 'moment';

export const ProductsReducer = (
  state = [1, 2, 3, 4] , action
) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const ProductsUIReducer = (
  state = {
    category: '',
    subCategory: '',
    subSubCategory: '',
    name: '',
    weight: '',
    price: '',
    description: '',
  }, action
) => {
  switch(action.type) {
    case 'SET_UI_PRODUCT_CATEGORY':
      return {
        ...state,
        category: action.payload.value,
      }
    case 'SET_UI_PRODUCT_SUB_CATEGORY':
      return {
        ...state,
        subCategory: action.payload.value,
      }
    case 'SET_UI_PRODUCT_SUB_SUB_CATEGORY':
      return {
        ...state,
        subSubCategory: action.payload.value,
      }
    case 'SET_UI_PRODUCT_NAME':
      return {
        ...state,
        name: action.payload.value,
      }
    case 'SET_UI_PRODUCT_WEIGHT':
     return {
        ...state,
        weight: action.payload.value,
      }
    case 'SET_UI_PRODUCT_PRICE':
      return {
        ...state,
        price: action.payload.value,
      }
    case 'SET_UI_PRODUCT_DESC':
      return {
        ...state,
        description: action.payload.value,
      }
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
