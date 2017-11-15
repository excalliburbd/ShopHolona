import React from 'react';

import './SigninSignup.css';

import PhoneSignInSignUpContainer from '../../containers/PhoneSignInSignUpContainer';

const SigninSignup = ({
  hideSideBar,
  isLogin
}) => {
  return <div className="SigninSignup">
    <PhoneSignInSignUpContainer title="Sign In/Sign up"
                                nextStep={ hideSideBar }
                                isLogin={isLogin}/>
  </div>
}

export default SigninSignup;
