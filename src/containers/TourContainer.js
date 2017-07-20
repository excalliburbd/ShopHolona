import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import TourComponent from '../components/Tour/TourComponent';

import { tourActions } from '../actions/';

import { getShopID } from '../selectors/shopSelectors';
import {
  getLoggedIn,
  getVendor,
} from '../selectors/userSelectors';

const mapStateToProps = state => {
  return {
    isOpen: state.ui.tour.isOpen,
    shop: getShopID(state),
    loggedIn: getLoggedIn(state),
    uploader: state.ui.uploader.active,
    steps: state.ui.tour.steps,
    done: state.ui.tour.done,
    vendor: getVendor(state),
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
    handleSetDone: done => {
      dispatch(tourActions.tour.set.done(true));
    },
    handleSetLastStep: step => {
      dispatch(tourActions.tour.set.lastStep(step));
    },
  }
}

const TourContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TourComponent));

export default TourContainer;
