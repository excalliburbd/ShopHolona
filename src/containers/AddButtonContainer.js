import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getCategory } from '../actions/productsActions';
import AddButton from '../components/AddButton';

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAddProduct: () => {
      dispatch({
        type: 'SHOW_SIDEBAR_ADD_PRODUCT'
      });
      dispatch(getCategory());
    }
  }
}

const AddButtonContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddButton));

export default AddButtonContainer;
