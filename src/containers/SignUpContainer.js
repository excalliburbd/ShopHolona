import { connect } from 'react-redux';

import { trySignInAsyncAction } from '../thunks/userThunks';

import { userActions } from '../actions/';

import SignUp from '../components/SignUp/SignUp';

const mapStateToProps = state => {
  return {
    email: state.ui.user.email,
    emailPassword: state.ui.user.emailPassword,
    phone: state.ui.user.phone,
    phonePassword: state.ui.user.phonePassword,
    error: state.ui.user.error,
    token: state.user.token,
    shop: state.shop.id,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleTrySignIn: (res, shop) => {
      dispatch(trySignInAsyncAction(res, shop));
    },
    handleEmailValue: val => {
      dispatch(userActions.user.ui.email(val));
    },
    handleEmailPasswordValue: val => {
      dispatch(userActions.user.ui.emailPassword(val));
    },
    handlePhoneValue: val => {
      dispatch(userActions.user.ui.phone(val));
    },
    handlePhonePasswordValue: val => {
      dispatch(userActions.user.ui.phonePassword(val));
    },
  }
}

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpContainer;

