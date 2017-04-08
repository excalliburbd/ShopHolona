import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import Navigation from '../components/Navigation';

const mapStateToProps = state => {
  return {
    pinned: state.ui.pinned,
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const NavigationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));

export default NavigationContainer;
