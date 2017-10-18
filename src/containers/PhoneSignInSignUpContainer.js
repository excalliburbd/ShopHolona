import {connect} from 'react-redux';
import uuid from 'uuid';

import {
  userActions,
} from '../actions/';

import {
  checkPhoneNumber,
  registerUser,
  resendVerificationCode,
  postVerificationCode,
  patchMe,
  trySignInAsyncAction,
} from '../thunks/userThunks';

import PhoneSignInSignUp from '../components/SignUp/PhoneSignInSignUp';

const mapStateToProps = state => {
  return {
    number: state.ui.user.phone.number,
    hasNumber: state.ui.user.phone.hasNumber,
    guestID: state.ui.user.guestUser.id,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleUpdatePhone: phone => {
      dispatch(userActions.user.ui.updatePhone(phone));
    },
    handleCheckPhoneNumber: phone => {
      dispatch(checkPhoneNumber(phone));
    },
    handleRegisterGuest: phone => {
      dispatch(registerUser(phone, uuid.v1()));
    },
    handleResendVerificationCode: phone => {
      dispatch(resendVerificationCode(phone));
    },
    handlePostVerificationCode: (phone, verification, fullName) => {
      dispatch(postVerificationCode(phone, verification));
      // dispatch(patchMe({ full_name: fullName })); TODO
    },
    handleSignIn: (phone, password, next) => {
      dispatch(trySignInAsyncAction({ phone, password }, false, next));
    },
  }
}

const PhoneSignInSignUpContainer = connect(mapStateToProps, mapDispatchToProps)(PhoneSignInSignUp);

export default PhoneSignInSignUpContainer;
