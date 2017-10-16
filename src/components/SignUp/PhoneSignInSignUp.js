import React from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';

import './PhoneSignInSignUp.css';

class PhoneSignInSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      validPhone: false,
      existingPhone: false,
      verificationStep: false
    }
  }

  // this property is used for dynamic typing of phone
  typingTimeout = null;

  checkPhoneThunks = (phone) => {
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.setState({
        validPhone: this.isValidPhone(phone),
        existingPhone: this.isExistingPhone(phone)
      });
    }, 2000)
  }

  isExistingPhone = (phone) => {
    // @todo call phone validation api
    return phone === '01670015725' ? true : false;
  }

  isValidPhone = (phone) => {
    const phoneRegex = new RegExp(/^(?:\+88|88|1)?(?:\d{11}|\d{10})$/);
    return phoneRegex.test(phone) ? true : false;
  }

  handlePhoneChange = (phone) => {
    this.setState({
      phone: phone
    }, this.checkPhoneThunks(phone));
  }

  handlePasswordChange = (password) => {
    this.setState({
      password: password
    });
  }

  handleVerify = () => {
    // @todo phone verification , goto next step
    this.setState({
      verificationStep: true
    })
  }

  handleSubmit = () => {
    // @todo call login api with this.state.phone this.state.password
  }

  verificationComponent = () => {
    return (
      <div className='verification-step'>
        <Input label='Enter 4 Digit Code'
          value={this.state.verification}
          required />
        <Input label='Enter Your Full Name'
          value={this.state.phone}
          required />
        <Button label='Login'
          className='verification-login-btn sh-btn--yellow'
          onClick={this.handleVerify} />
        <Button label='Resend Verification Code'
          className='verification-resend-btn sh-btn--yellow'
          onClick={this.handleVerify} />
      </div>
    )
  }

  mainComponent = () => {
    return (
      <div>
        <Input label='Enter Your Phone Number'
          value={this.state.phone}
          required
          onChange={this.handlePhoneChange} />
        {
          this.state.validPhone && this.state.existingPhone ?
            <div>
              <Input label='Enter Your Password'
                type='password'
                value={this.state.password}
                required
                onChange={this.handlePasswordChange} />
              <Button label='Login'
                raised
                className='PhoneSignInSignUp-login-btn sh-btn--yellow'
                onClick={this.handleSubmit} />
            </div>
            : this.state.validPhone ?
              <Button label='Verify Phone'
                className='VerifyPhone-btn sh-btn--yellow'
                onClick={this.handleVerify} />
              : null
        }
      </div>
    )
  }

  render() {
    return (
      this.state.verificationStep ?
        <div className='PhoneSignInSignUp'>
          <div className='sign-up-number'> {this.props.title}</div>
          {this.verificationComponent()}
        </div>
        :
        <div className='PhoneSignInSignUp'>
          <div className='sign-up-number'> {this.props.title}</div>
          {this.mainComponent()}
        </div>
    )
  }
}

export default PhoneSignInSignUp;
