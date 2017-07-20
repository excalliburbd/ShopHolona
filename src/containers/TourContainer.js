import {connect} from 'react-redux';

import TourComponent from '../components/Tour/TourComponent';

import { tourActions } from '../actions/';

import { getShopID } from '../selectors/shopSelectors';
import { getLoggedIn } from '../selectors/userSelectors';

const mapStateToProps = state => {
  return {
    isOpen: state.ui.tour.isOpen,
    shop: getShopID(state),
    loggedIn: getLoggedIn(state),
    uploader: state.ui.uploader.active,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleToggleTour: (open) => {
      dispatch(tourActions.tour.set.open(!open));
    },
    handleSetTour: (open) => {
      dispatch(tourActions.tour.set.open(open));
    },
    handleSetStep: step => {
      dispatch(tourActions.tour.set.history(step));
    },
  }
}

const TourContainer = connect(mapStateToProps, mapDispatchToProps)(TourComponent);

export default TourContainer;
