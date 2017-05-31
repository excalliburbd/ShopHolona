import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-toolbox/lib/button/Button';

import Input from 'react-toolbox/lib/input/Input';

import GLogin from './GLogin';
import FbLogin from './FbLogin';
import './SignUp.css';

const SignUp = ({
  handleTrySignIn,
  email,
  handleEmailValue,
  emailPassword,
  handleEmailPasswordValue,
  phone,
  phonePassword,
  handlePhoneValue,
  handlePhonePasswordValue,
  error,
  shop
}) => (
  <div className="SignUp">
    <div className="SignUp-header">
      <h1>ShopHobe</h1>
      <p>Sign In/Sign Up to view dashboard</p>
    </div>
    <div className="SignUp-social">
      <FbLogin disabled handleOnLogin={
        handleTrySignIn
      } />
      <GLogin disabled handleOnLogin={
        handleTrySignIn
      } />
    </div>
    <div>
      <p>Or</p>
    </div>
      <Input type='email'
             label='Using email address'
             required
             value={ email }
             onChange={ handleEmailValue }
             error={ error && "Error with Email" }
             icon='email' />
      <Input type='password'
             required
             label='Enter your password'
             value={ emailPassword }
             onChange={ handleEmailPasswordValue }
             onKeyPress={
               event => {
                 if(event.which === 13) {
                   handleTrySignIn({ email, password: emailPassword}, shop)
                 }
               }
             }
             icon='vpn_key' />
      <Button icon="forward"
              label="login"
              onClick={ () => handleTrySignIn({ email, password: emailPassword}, shop) } />
    <div>
      <p>Or</p>
    </div>
    <Input type='tel'
            label='Using phone number'
            name='phone'
            required
            value={ phone }
            onChange={ handlePhoneValue }
            disabled
            icon='local_phone' />
    <Input type='password'
            required
            label='Enter your password'
            value={ phonePassword }
            onChange={ handlePhonePasswordValue }
            disabled
            icon='vpn_key' />
    <Button icon="forward" label="login" onClick={ handleTrySignIn } />
  </div>
);

SignUp.proptypes = {
  handleTrySignIn: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  handleEmailValue: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordValu: PropTypes.func.isRequirede,
  phone: PropTypes.string.isRequired,
  handlePhoneValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SignUp;
