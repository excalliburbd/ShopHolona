import { connect } from 'react-redux';

import Dashboard from '../components/BackOffice/Dashboard';

const mapStateToProps = state => {
  return {
    procudctsStatus: [
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
