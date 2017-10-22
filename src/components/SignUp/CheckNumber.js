import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';

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
}) => {
  return (
    <div>
      <Input label='Enter Your Phone Number'
             className="enter-number" 
             value={ phone }
             onKeyPress={(event)=>{if (event.which === 13) {handleSubmit(phone)}}}
             onChange={ value => updatePhone(value) }
             required />
      {
        (validPhone && existingPhone) &&
          <div>
            <Input label='Enter Your Password'
                   type='password'
                   value={ password }
                   onKeyPress={(event)=>{if (event.which === 13) {handleSubmit(phone)}}}
                   required
                   onChange={ handlePasswordChange } />
            <Button label='Login'
                    raised
                    className='PhoneSignInSignUp-login-btn sh-btn--yellow'
                    onClick={ () => handleSubmit(phone) } />
            <button className='forgot-password' onClick={()=>{console.log("forgot password")}}>Forgot Your Password? Click here to reset</button>
          </div>
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
