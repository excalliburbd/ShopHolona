import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Input from 'react-toolbox/lib/input';
import MdEmail from 'react-icons/lib/md/email';
import MdLocalPhone from 'react-icons/lib/md/local-phone';
import FaCode from 'react-icons/lib/fa/code';

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
}) => (
  <div className="SignUp">
    <div className="SignUp-header">
      <h1>ShopHobe</h1>
      <p>Sign In/Sign Up to view dashboard</p>
    </div>
    <div className="SignUp-social">
      <FbLogin handleOnLogin={
        handleTrySignIn
      } />
      <GLogin handleOnLogin={
        handleTrySignIn
      } />
    </div>
    <div>
      <p>Or</p>
    </div>
    <div className="SignUp-input">
      <Input type='email'
             label='Using email address'
             required
             value={ email }
             onChange={ handleEmailValue }
             error={ error && "Fucking error" }
             icon='email' />
    </div>
    <div className="SignUp-input">
      <Input type='password'
             required
             label='Enter your password'
             value={ emailPassword }
             onChange={ handleEmailPasswordValue }
             icon='vpn_key' />
      <IconButton icon="forward" onClick={ () => handleTrySignIn({ email, password: emailPassword}) } />
    </div>
    <div>
      <p>Or</p>
    </div>
    <div className="SignUp-input">
      <Input type='tel'
             label='Using phone number'
             name='phone'
             required
             value={ phone }
             onChange={ handlePhoneValue }
             icon='local_phone' />
    </div>
     <div className="SignUp-input">
      <Input type='password'
             required
             label='Enter your password'
             value={ phonePassword }
             onChange={ handlePhonePasswordValue }
             icon='vpn_key' />
      <IconButton icon="forward" onClick={ handleTrySignIn } />
    </div>
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
