import React from 'react';

import CheckNumber from './CheckNumber';
import VerificationComponent from './VerificationComponent';

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
      this.isValidPhone(phone) && this.props.handleCheckPhoneNumber(phone);
      this.setState({
        validPhone: this.isValidPhone(phone)
      });
    }, 1000)
  }

  isExistingPhone = (phone) => {
    // @todo call phone validation api
    return phone === '01670015725' ? true : false;
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

  handleVerify = () => {
    // @todo phone verification , goto next step
    this.setState({
      verificationStep: true
    })
  }

  handleSubmit = () => {
    // @todo call login api with this.state.phone this.state.password
  }

  render() {
    const {
      title,
      phone,
      handleUpdatePhone,
      hasNumber
    } = this.props;

    const {
      validPhone,
      password,
    } = this.state;

    return (
        <div className='PhoneSignInSignUp'>
          <div className='PhoneSignInSignUp-title'> { title }</div>
         {
            this.state.verificationStep ?
              <VerificationComponent phone={ phone }
                                     updatePhone={ handleUpdatePhone }
                                     verify={ this.handleVerify }
                                     validPhone={ validPhone }
                                     existingPhone={ hasNumber }
                                     password={ password }
                                     handlePasswordChange={ this.handlePasswordChange }
                                     handleSubmit={ this.handleSubmit } /> :
              <CheckNumber phone={ phone }
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
