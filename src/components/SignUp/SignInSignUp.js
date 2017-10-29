import React from 'react';

// import './SigninSignup.css';

import PhoneSignInSignUpContainer from '../../containers/PhoneSignInSignUpContainer';

const SigninSignup = ({
  hideSideBar,
}) => {
  return <div className="SigninSignup">
    <PhoneSignInSignUpContainer title="Sign In/Sign up"
                                nextStep={ hideSideBar } />
  </div>
}

export default SigninSignup;
