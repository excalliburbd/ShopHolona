export const BackOfficeUIReducer = (
  state = {
    menu: {
      products: [
        {
          value: 0,
          label: 'All',
        },
        {
          value: 1,
          label: 'Featured',
        },
        {
          value: 2,
          label: 'Live',
        },
        {
          value: 3,
          label: 'Out of Stock',
        },
        {
          value: 4,
          label: 'Pending Review',
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
