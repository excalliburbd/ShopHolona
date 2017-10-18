import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import './VerificationComponent.css';

const VerificationComponent = ({
  verification,
  phone,
  handleVerify,
  updatePhone,
}) => {
  return (
    <div className='verification-step'>
      <Input label='Enter 4 Digit Code'
             value={ verification }
             required />
      <Input label='Enter Your Full Name'
             value={ phone}
             onChange={ value => updatePhone(value) }
             required />
      <Button label='Login'
              className='verification-login-btn sh-btn--yellow'
              onClick={ handleVerify } />
      <Button label='Resend Verification Code'
              className='verification-resend-btn'
              onClick={ handleVerify } />
    </div>
  )
}

export default VerificationComponent;
