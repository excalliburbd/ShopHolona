import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import './VerificationComponent.css';

const VerificationComponent = ({
  verification,
  name,
  login,
  changeFullName,
  isLogin,
  updateCode,
  resendCode,
  phone,
  password,
  handlePasswordChange
}) => {
  return (
    <div className='verification-step'>
      <Input label='Enter 4 Digit Code'
             value={ verification }
             onChange={ val => updateCode(val) }
             onKeyUp={(event)=>{if (event.which === 13) {login(phone, verification)}}}
             required />
      <Input label='Enter Your Full Name'
             value={ name }
             onChange={ value => changeFullName(value) }
             onKeyUp={(event)=>{if (event.which === 13) {login(phone, verification)}}}
             required />
      {
        isLogin &&
        <Input label='Password'
                type='password'
                value={ password }
                onChange={ value => handlePasswordChange(value) }
                onKeyUp={(event)=>{if (event.which === 13) {login(phone, verification)}}}
                required />
      }
      <Button label='Login'
              className='verification-login-btn sh-btn--yellow'
              onClick={ () => login(phone, verification) } />
      <Button label='Resend Verification Code'
              className='verification-resend-btn sh-btn--yellow'
              onClick={ () => resendCode(phone) } />
    </div>
  )
}

export default VerificationComponent;
