import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';

const mapStateToProps = state => {
  return {
    procudctsStatus: [
      {
        lable: 'All',
        amount: 12,
      },
      {
        lable: 'Featured',
        amount: 2,
      },
      {
        lable: 'Live',
        amount: 4,
      },
      {
        lable: 'Out of Stock',
        amount: 3,
      },
      {
        lable: 'Pending Review',
        amount: 0,
      },
    ],
    reviewsStatus: [
      {
        lable: 'All',
        amount: 12,
      },
      {
        lable: 'Pending',
        amount: 2,
      },
      {
        lable: 'Spam',
        amount: 4,
      },
      {
        lable: 'Trash',
        amount: 3,
      },
    ],
    ordersStatus: [
      {
        lable: 'Total',
        amount: 24,
      },
      {
        lable: 'Total',
        amount: 12,
      },
      {
        lable: 'Pending',
        amount: 2,
      },
      {
        lable: 'Processing',
        amount: 4,
      },
      {
        lable: 'Canceled',
        amount: 3,
      },
      {
        lable: 'Refunding',
        amount: 0,
      },
      {
        lable: 'On Hold',
        amount: 3,
      },
    ],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default FilterBarContainer;
