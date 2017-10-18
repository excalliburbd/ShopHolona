import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';

const VerificationComponent = ({
  verification,
  name,
  login,
  changeFullName,
  updateCode,
  resendCode,
  phone,
}) => {
  return (
    <div className='verification-step'>
      <Input label='Enter 4 Digit Code'
             value={ verification }
             onChange={ val => updateCode(val) }
             required />
      <Input label='Enter Your Full Name'
             value={ name }
             onChange={ value => changeFullName(value) }
             required />
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
