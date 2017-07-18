import {connect} from 'react-redux';

import TourComponent from '../components/TourComponent';

import { tourActions } from '../actions/';

import { getShopID } from '../selectors/shopSelectors';

const mapStateToProps = state => {
  return {
    isOpen: state.ui.tour.isOpen,
    shop: getShopID(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleToggleTour: (open) => {
      dispatch(tourActions.tour.set.open(!open));
    },
    handleSetTour: (open) => {
      dispatch(tourActions.tour.set.open(open));
    }
  }
}

const TourContainer = connect(mapStateToProps, mapDispatchToProps)(TourComponent);

export default TourContainer;
