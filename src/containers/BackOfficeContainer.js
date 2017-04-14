import { connect } from 'react-redux';

import BackOffice from '../components/BackOffice';

const mapStateToProps = state => {
  return {
    menu: state.ui.backOffice.menu,
    index: state.ui.backOffice.selectedIndex.products
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleTabChange: index => {
      dispatch({
        type: 'CHANGE_UI_TAB',
        index
      })
    }
  }
}

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(BackOffice);

export default FilterBarContainer;
