import React from 'react';

import Input from 'react-toolbox/lib/input/Input';

import './PhoneSignInSignUp.css';

const PhoneSignInSignUp = ({
  title,
}) => {
  return <div className="PhoneSignInSignUp">
    <div className="sign-up-number"> { title }</div>
    <Input label='Enter Your Phone Number'
           required
           onChange={ () => null } />
  </div>
}

export default PhoneSignInSignUp;
