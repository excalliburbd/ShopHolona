import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import Link from 'react-toolbox/lib/link/Link';

import './CheckNumber.css';

const CheckNumber = ({
  phone,
  updatePhone,
  verify,
  validPhone,
  existingPhone,
  password,
  handlePasswordChange,
  handleSubmit,
  setForgotPassword,
}) => {
  return (
    <div className="CheckNumber">
      <Input label='Enter Your Phone Number'
             className="enter-number"
             value={ phone }
             onKeyPress={(event)=>{if (event.which === 13) {handleSubmit(phone)}}}
             onChange={ value => updatePhone(value) }
             required />
      {
        (validPhone && existingPhone) && [
            <Input label='Enter Your Password'
                   type='password'
                   value={ password }
                   onKeyPress={(event)=>{if (event.which === 13) {handleSubmit(phone)}}}
                   required
                   onChange={ handlePasswordChange }
                   key="password"  />,
            <Button label='Login'
                    raised
                    className='PhoneSignInSignUp-login-btn sh-btn--yellow'
                    onClick={ () => handleSubmit(phone) }
                    key="Login"/>,
            <Link className='forgot-password'
                  onClick={
                    () => setForgotPassword(true)
                  }
                  label="Forgot Your Password? Click here to reset"
                  icon="vpn_key"
                  key="forgot"/>,
        ]
      }
      {
        (validPhone && !existingPhone) && <Button label='Verify Phone'
                                                  className='VerifyPhone-btn sh-btn--yellow'
                                                  onClick={ () => verify(phone) } />
      }
    </div>
  )
}

export default CheckNumber;
