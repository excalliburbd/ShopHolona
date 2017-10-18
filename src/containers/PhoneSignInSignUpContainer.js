import {connect} from 'react-redux';

import {
  userActions,
} from '../actions/';

import {
  checkPhoneNumber,
} from '../thunks/userThunks';

import PhoneSignInSignUp from '../components/SignUp/PhoneSignInSignUp';

const mapStateToProps = state => {
  return {
    number: state.ui.user.phone.number,
    hasNumber: state.ui.user.phone.hasNumber,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleUpdatePhone: phone => {
      dispatch(userActions.user.ui.updatePhone(phone));
    },
    handleCheckPhoneNumber: phone => {
      dispatch(checkPhoneNumber(phone));
    }
  }
}

const PhoneSignInSignUpContainer = connect(mapStateToProps, mapDispatchToProps)(PhoneSignInSignUp);

export default PhoneSignInSignUpContainer;
