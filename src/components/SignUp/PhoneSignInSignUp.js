import React from 'react';

import Input from 'react-toolbox/lib/input/Input';

import './PhoneSignInSignUp.css';

class PhoneSignInSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      timeout: null
    }
  }
  timeout = null;
  
  callThunks = (phone) => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(()=>{
          console.log(phone);
        }, 2000)
  }

  handleChange = (phone) => {
    this.setState({
      phone: phone
    }, this.callThunks(phone))
  }

  render() {
    return (
      <div className="PhoneSignInSignUp">
        <div className="sign-up-number"> { this.props.title }</div>
        <Input label='Enter Your Phone Number'
               value={this.state.phone}
               required
               onChange={this.handleChange} />
      </div>
    )
  }
}

export default PhoneSignInSignUp;
