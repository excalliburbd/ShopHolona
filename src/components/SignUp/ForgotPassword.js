import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';

const ForgorPassword = ({
  phone,
  updatePhone,
  handleSubmit
}) => {
  return (
    <div>
      <div>
        <Input label='Enter Your Phone Number'
          value={phone}
          onChange={value => updatePhone(value)}
          required />
        <Button label='Send Verification Code'
          raised
          className='SendVerification-btn sh-btn--yellow'
          onClick={() => handleSubmit(phone)} />
      </div>
    </div>
  )
}

export default ForgorPassword;