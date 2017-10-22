import React from 'react';

import CheckNumber from './CheckNumber';
import VerificationComponent from './VerificationComponent';

import './PhoneSignInSignUp.css';

class PhoneSignInSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      password: '',
      validPhone: false,
      existingPhone: false,
      code: '',
    }
  }

  // this property is used for dynamic typing of phone
  typingTimeout = null;

  checkPhoneThunks = (phone) => {
    if (phone.length >= 10) {
      if (phone.slice(0,1) === '+' && phone.length === 14) {

      } else if(phone.slice(0,1) === '8' && phone.length === 13) {
        phone = `+${phone}`;
      } else if(phone.slice(0,1) === '0' && phone.length === 11) {
        phone = `+88${phone}`;
      } else if(phone.slice(0,1) === '1' && phone.length === 10) {
        phone = `+880${phone}`;
      }
    }

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.isValidPhone(phone) && this.props.handleCheckPhoneNumber(phone);
      this.setState({
        validPhone: this.isValidPhone(phone)
      });
    }, 1000)
  }

  isValidPhone = (phone) => {
    const phoneRegex = new RegExp(/^(?:\+88|88|1)?(?:\d{11}|\d{10})$/);
    return phoneRegex.test(phone);
  }

  handlePasswordChange = (password) => {
    this.setState({
      password: password
    });
  }

  handleVerify = (phone) => {
    if (phone.length >= 10) {
      if (phone.slice(0,1) === '+' && phone.length === 14) {
        this.props.handleRegisterGuest(phone);
      } else if(phone.slice(0,1) === '8' && phone.length === 13) {
        this.props.handleRegisterGuest(`+${phone}`);
      } else if(phone.slice(0,1) === '0' && phone.length === 11) {
        this.props.handleRegisterGuest(`+88${phone}`);
      } else if(phone.slice(0,1) === '1' && phone.length === 10) {
        this.props.handleRegisterGuest(`+880${phone}`);
      }
    }
  }

  handleSubmit = phone => {
    // @todo call login api with this.state.phone this.state.password
    const {
      nextStep
    } = this.props;

    if (phone.length >= 10) {
      if (phone.slice(0,1) === '+' && phone.length === 14) {
        this.props.handleSignIn(phone, this.state.password, nextStep);
      } else if(phone.slice(0,1) === '8' && phone.length === 13) {
        this.props.handleSignIn(`+${phone}`, this.state.password, nextStep);
      } else if(phone.slice(0,1) === '0' && phone.length === 11) {
        this.props.handleSignIn(`+88${phone}`, this.state.password, nextStep);
      } else if(phone.slice(0,1) === '1' && phone.length === 10) {
        this.props.handleSignIn(`+880${phone}`, this.state.password, nextStep);
      }
    }
  }

  handleChangeFullName = name => {
    this.setState({
      fullName: name,
    })
  }

  handleUpdateVerificationCode = code => {
    this.setState({
      code,
    })
  }

  render() {
    const {
      title,
      number,
      handleUpdatePhone,
      hasNumber,
      guestID,
      handleResendVerificationCode,
      handlePostVerificationCode,
      nextStep,
    } = this.props;

    const {
      validPhone,
      password,
      fullName,
      code,
    } = this.state;

    return (
        <div className='PhoneSignInSignUp'>
          <div className='PhoneSignInSignUp-title'> { title }</div>
         {
            guestID ?
              <VerificationComponent phone={ number }
                                     updatePhone={ handleUpdatePhone }
                                     name={ fullName }
                                     changeFullName={ this.handleChangeFullName }
                                     verify={ this.handleVerify }
                                     validPhone={ validPhone }
                                     existingPhone={ hasNumber }
                                     password={ password }
                                     handlePasswordChange={ this.handlePasswordChange }
                                     handleSubmit={ this.handleSubmit }
                                     verification={ code }
                                     updateCode={ this.handleUpdateVerificationCode }
                                     resendCode={ handleResendVerificationCode }
                                     login={ (loginPhone, loginCode) => handlePostVerificationCode(loginPhone, loginCode, this.state.fullName, nextStep) }  /> :
              <CheckNumber phone={ number }
                           updatePhone={ phone => {
                             this.checkPhoneThunks(phone);
                             handleUpdatePhone(phone);
                           }}
                           verify={ this.handleVerify }
                           validPhone={ validPhone }
                           existingPhone={ hasNumber }
                           password={ password }
                           handlePasswordChange={ this.handlePasswordChange }
                           handleSubmit={ this.handleSubmit } />
         }
        </div>
    )
  }
}

export default PhoneSignInSignUp;
