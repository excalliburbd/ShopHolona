import React from 'react';

import CheckNumber from './CheckNumber';
import VerificationComponent from './VerificationComponent';
import ForgotPassword from './ForgotPassword';

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
      forgotPassword: false,
    }
  }

  // this property is used for dynamic typing of phone
  typingTimeout = null;

  checkPhoneThunks = (phone) => {
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
    this.props.handleRegisterGuest(phone);
  }

  handleSubmit = phone => {
    // @todo call login api with this.state.phone this.state.password
    const {
      nextStep
    } = this.props;

    this.props.handleSignIn(phone, this.state.password, nextStep);
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

  handleSetForgotPassword = state => {
    this.setState({
      forgotPassword: state,
    });
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
      forgotPassword
    } = this.state;

    return (
        <div className="PhoneSignInSignUp">
          <div className="PhoneSignInSignUp-title">{ (!guestID && forgotPassword) ? 'Verify And Access Your Account' : title }</div>
          { (!guestID && forgotPassword) && <div className="PhoneSignInSignUp-subTitle">Please check your phone for a verification code</div> }
         {
            guestID && <VerificationComponent phone={ number }
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
                                     login={ (loginPhone, loginCode) => handlePostVerificationCode(loginPhone, loginCode, this.state.fullName, nextStep) }  />
          }
          {
            (!guestID && !forgotPassword) && <CheckNumber  phone={ number }
                                                                      updatePhone={ phone => {
                                                                        this.checkPhoneThunks(phone);
                                                                        handleUpdatePhone(phone);
                                                                      }}
                                                                      verify={ this.handleVerify }
                                                                      validPhone={ validPhone }
                                                                      existingPhone={ hasNumber }
                                                                      password={ password }
                                                                      handlePasswordChange={ this.handlePasswordChange }
                                                                      handleSubmit={ this.handleSubmit }
                                                                      setForgotPassword={ this.handleSetForgotPassword } />
         }
         {
           (!guestID && forgotPassword) &&
              <ForgotPassword phone={ number }
                              updatePhone={ phone => {
                                this.checkPhoneThunks(phone);
                                handleUpdatePhone(phone);
                              }}/>
         }
        </div>
    )
  }
}

export default PhoneSignInSignUp;

