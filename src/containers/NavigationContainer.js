import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Nav from '../components/Navigation';

const mapStateToProps = state => {
  return {
    searchbar: state.ui.nav.searchbar,
  }
}

const mapDispatchToProps = dispatch => {
  return {
   showSearchbar: () => {
     dispatch({
       type: 'SHOW_NAVIGATION_SEARCHBAR',
     })
   },
   hideSearchbar: () => {
     dispatch({
       type: 'HIDE_NAVIGATION_SEARCHBAR',
     })
   }
  }
}

const NavigationContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));

export default NavigationContainer;
