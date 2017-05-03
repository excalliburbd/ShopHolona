import { connect } from 'react-redux';

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
      })
    }
  }
}

const AddButtonContainer = connect(mapStateToProps, mapDispatchToProps)(AddButton);

export default AddButtonContainer;
