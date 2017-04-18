import { connect } from 'react-redux';

import { trySignInAsyncAction } from '../actions/signInSignUpActions';

import SignUp from '../components/SignUp';

const mapStateToProps = state => {
  return {
    email: state.ui.user.email,
    emailPassword: state.ui.user.emailPassword,
    phone: state.ui.user.phone,
    phonePassword: state.ui.user.phonePassword,
    error: state.ui.user.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleTrySignIn: res => {
      dispatch(trySignInAsyncAction(res));
    },
    handleEmailValue: val => {
      dispatch({
        type: 'UPDATE_USER_UI_EMAIL',
        val,
      })
    },
    handleEmailPasswordValue: val => {
      dispatch({
        type: 'UPDATE_USER_UI_EMAIL_PASSWORD',
        val,
      })
    },
    handlePhoneValue: val => {
      dispatch({
        type: 'UPDATE_USER_UI_PHONE',
        val,
      })
    },
    handlePhonePasswordValue: val => {
      dispatch({
        type: 'UPDATE_USER_UI_PHONE_PASSWORD',
        val,
      })
    },
  }
}

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpContainer;

