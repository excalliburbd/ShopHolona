import {connect} from 'react-redux';
import uuid from 'uuid';

import {
  userActions,
} from '../actions/';

import {
  checkPhoneNumber,
  changePassword,
  registerUser,
  resendVerificationCode,
  postVerificationCode,
  trySignInAsyncAction,
  sendForgotPassword,
  resetPassword,
} from '../thunks/userThunks';

import PhoneSignInSignUp from '../components/SignUp/PhoneSignInSignUp';

const mapStateToProps = state => {
  return {
    number: state.ui.user.phone.number,
    hasNumber: state.ui.user.phone.hasNumber,
    guestID: state.ui.user.guestUser.id,
    guestPassword: state.ui.user.guestUser.password,
    guestToken: state.ui.user.guestUser.token
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
      const pass = uuid.v1();

      dispatch(registerUser(phone, pass));
      dispatch(userActions.user.set.guestUserPassword(pass));
    },
    changePassword: (oldPass, pass, token, phone, resetCart) => {
      dispatch(changePassword(oldPass, pass, token, phone, resetCart));
    },
    handleResendVerificationCode: phone => {
      dispatch(resendVerificationCode(phone));
    },
    handlePostVerificationCode: (phone, verification, fullName, next, changePassword, isLogin, password) => {
      if (isLogin) {
        dispatch(postVerificationCode(phone, verification, fullName, next, changePassword, password));
      } else {
        dispatch(postVerificationCode(phone, verification, fullName, next, changePassword, null));
      }
    },
    handleSignIn: (phone, password, next) => {
      dispatch(trySignInAsyncAction({ phone, password }, false, next));
    },
    handleSendForgotPassword: (phone, next) => {
      dispatch(sendForgotPassword(phone, next));
    },
    handleResetPassword: (phone, code, password, next) => {
      dispatch(resetPassword(phone, code, password, next));
    },
  }
}

const PhoneSignInSignUpContainer = connect(mapStateToProps, mapDispatchToProps)(PhoneSignInSignUp);

export default PhoneSignInSignUpContainer;
