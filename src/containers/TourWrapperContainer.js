import { connect } from 'react-redux';

import TourWrapper from '../components/Tour/TourWrapper';

import { tourActions } from '../actions/';

import {
  getTourIsOpen,
  getCurrentStep,
  getLastStep,
} from '../selectors/tourSelectors';

const mapStateToProps = state => {
  return {
    isOpen: getTourIsOpen(state),
    currentStep: getCurrentStep(state),
    lastStep: getLastStep(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSkip: () => {
      dispatch(tourActions.tour.set.done(true));
      dispatch(tourActions.tour.set.open(false));
    },
  }
}

const TourWrapperContainer = connect(mapStateToProps, mapDispatchToProps)(TourWrapper);

export default TourWrapperContainer;
