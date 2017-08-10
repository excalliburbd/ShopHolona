import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import TourComponent from '../components/Tour/TourComponent';

import { tourActions } from '../actions/';

import { getShopID } from '../selectors/shopSelectors';
import {
  getTourIsOpen,
  getTourSteps,
  getTourDone,
  getShowTourOnStartUp,
} from '../selectors/tourSelectors';

const mapStateToProps = state => {
  return {
    isOpen: getTourIsOpen(state),
    shop: getShopID(state),
    steps: getTourSteps(state),
    done: getTourDone(state),
    tourOnStartup: getShowTourOnStartUp(state),
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
