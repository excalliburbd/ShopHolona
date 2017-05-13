import { connect } from 'react-redux';

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

const AddButtonContainer = connect(mapStateToProps, mapDispatchToProps)(AddButton);

export default AddButtonContainer;
