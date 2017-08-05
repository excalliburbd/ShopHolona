import { connect } from 'react-redux';

import Confirm from '../components/Confirm';

import { confirmActions } from '../actions/';

const mapStateToProps = state => {
  return {
    active: state.ui.confirm.active,
    actionTitle: state.ui.confirm.title,
    actionStatement: state.ui.confirm.statement,
    action: state.ui.confirm.action,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClose: () => {
      dispatch(confirmActions.confirmDialoug.hide());
    },
    handleDone: action => {
      action();
      dispatch(confirmActions.confirmDialoug.hide());
    },
  }
}

const ImageUploaderContainer = connect(mapStateToProps, mapDispatchToProps)(Confirm);

export default ImageUploaderContainer;
