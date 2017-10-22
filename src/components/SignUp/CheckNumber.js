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
             onChange={ value => updatePhone(value) }
             required />
      {
        (validPhone && existingPhone) &&
          <div>
            <Input label='Enter Your Password'
                   type='password'
                   value={ password }
                   required
                   onChange={ handlePasswordChange } />
            <Button label='Login'
                    raised
                    className='PhoneSignInSignUp-login-btn sh-btn--yellow'
                    onClick={ () => handleSubmit(phone) } />
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
