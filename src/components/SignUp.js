import React from 'react';
import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Input from 'react-toolbox/lib/input';
import MdEmail from 'react-icons/lib/md/email';
import MdLocalPhone from 'react-icons/lib/md/local-phone';
import FaCode from 'react-icons/lib/fa/code';

import GLogin from './GLogin';
import FbLogin from './FbLogin';


import './SignUp.css';

const SignUp = () => (
  <div className="SignUp">
    <div className="SignUp-header">
      <h1>ShopHobe</h1>
      <p>Sign In/Sign Up to view dashboard</p>
    </div>
    <div className="SignUp-social">
      <FbLogin />
      <GLogin />
    </div>
    <div>
      <p>Or</p>
    </div>
    <div className="SignUp-input">
      <Input type='email'
            label='Using email address'
            required
            icon={ <MdEmail /> } />
      <IconButton icon="forward" raised/>
    </div>
    <div>
      <p>Or</p>
    </div>
    <div className="SignUp-input">
      <Input type='tel'
            label='Using phone number'
            name='phone'
            required
            icon={ <MdLocalPhone /> } />
      <IconButton icon="forward" raised/>
    </div>
  </div>
);

export default SignUp;
