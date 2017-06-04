import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getCategory } from '../thunks/productThunks';

import { sidebarActions } from '../actions/';

import AddButton from '../components/AddButton';

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAddProduct: () => {
      dispatch(sidebarActions.sidebar.show.addProduct());
      dispatch(getCategory());
    }
  }
}

const AddButtonContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddButton));

export default AddButtonContainer;
