import React, { Component } from 'react';

import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import Link from 'react-toolbox/lib/link/Link';

class ForgorPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      password: '',
      confirmPassword: '',
      codeError: false,
      passwordError: false,
      confirmPasswordMatchError: false,
      confirmPasswordEmptyError: false,
      code: '',
    }
  }

  handleUpdatePassword = (value, confirm) => {
    this.setState(
      (prevState, porps) => {
        return {
          password: confirm ? this.state.password : value,
          confirmPassword: confirm ? value : this.state.confirmPassword,
        }
      }
    );
  }

  render() {
    const {
      handleSubmit,
      sendCode,
    } = this.props;

    const {
      code,
      password,
      confirmPassword,
      codeError,
      passwordError,
      confirmPasswordMatchError,
      confirmPasswordEmptyError,
    } = this.state;

    return (
      <div className="ForgotPassword">
        <div>
          <Input  label='Enter Verification Code'
                  value={ code }
                  onChange={ value => this.setState({
                    code: value,
                  })}
                  onBlur={
                    () => {
                      this.setState({
                        codeError
                      });
                    }
                  }
                  error={ codeError ? 'Please enter the validation code' : null }
                  required />
          <Input  label='Enter New Password'
                  value={ password }
                  onChange={ value => this.handleUpdatePassword(value, false) }
                  onBlur={
                    () => {
                      this.setState({
                        passwordError: password.length === 0
                      });
                    }
                  }
                  error={ passwordError ? 'Please enter a password' : null }
                  type="password"
                  required />
          <Input  label='Confirm New Password'
                  value={ confirmPassword }
                  onChange={ value => this.handleUpdatePassword(value, true) }
                  onBlur={ () => {
                    this.setState({
                      confirmPasswordMatchError: password !== confirmPassword,
                      confirmPasswordEmptyError: confirmPassword.length === 0,
                    })
                  }}
                  error={ confirmPasswordMatchError ? 'Passwords do not match' : confirmPasswordEmptyError ? 'Plesae confirm your password' : null }
                  type="password"
                  required />
          <Button  label="Resend Verification Code"
                   className="SendVerification-btn"
                   onClick={ sendCode } />
          <Button label="Log Back In!"
                  className="SendVerification-btn"
                  onClick={
                    () => {
                      this.setState({
                        codeError: code.length === 0,
                        passwordError: password.length === 0,
                        confirmPasswordMatchError: password !== confirmPassword,
                        confirmPasswordEmptyError: confirmPassword.length === 0,
                      })

                      if (code.length !== 0 && password.length !== 0 && password === confirmPassword && confirmPassword.length !== 0) {
                        handleSubmit(code, password);
                      }
                    }
                  } />
          <Link className='forgot-password'
                href="https://www.messenger.com/t/Shophobe"
                label="Don't have access to your phone? Contact us for Support"
                icon="message"
                key="forgot"/>
        </div>
      </div>
    );
  }
}

export default ForgorPassword;
