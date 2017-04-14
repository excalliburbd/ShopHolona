import { connect } from 'react-redux';

import BackOffice from '../components/BackOffice';

const mapStateToProps = state => {
  return {
    menu: state.ui.products.menu,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(BackOffice);

export default FilterBarContainer;
