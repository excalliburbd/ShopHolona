import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import Nav from '../components/Navigation';

const mapStateToProps = state => {
  return {
    pinned: state.ui.pinned,
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const NavigationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));

export default NavigationContainer;
