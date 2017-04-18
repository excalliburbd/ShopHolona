import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-toolbox/lib/button/Button';
import FaFacebook from 'react-icons/lib/fa/facebook';

class FbLogin extends Component {
  constructor(props) {
    super(props);

    this.checkLoginState = this.checkLoginState.bind(this);
    this.responseHandler = this.responseHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    (function (d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '1827940184093313',
        xfbml: true,
        version: 'v2.8',
      });
    };
  }

  responseHandler (response) {
    const {
      accessToken,
      id,
      email,
      name,
      picture,
    } = response;

    console.log('I"m in')

    if (response) {
      this.props.handleOnLogin({
        accessToken,
        id,
        email,
        name,
        picture: picture.data.url,
      });
    }
  }

  responseApi (authResponse) {
    window.FB.api('/me', { fields: 'id,email,name,picture.type(large)' }, (me) => {
      me.accessToken = authResponse.accessToken;
      this.responseHandler(me);

    });
  };

  checkLoginState (response) {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else {
      if (this.responseHandler) {
        this.responseHandler({ status: response.status });
      }
    }
  };

  clickHandler () {
    window.FB.login(this.checkLoginState, { scope: 'public_profile,email' });
  };

  render() {
    return (
      <div>
        <Button raised primary onClick={ this.clickHandler }>
          <FaFacebook /> using Facebook
        </Button>
      </div>
    );
  }
}

FbLogin.proptypes = {
  handleOnLogin: PropTypes.func.isRequired,
}

export default FbLogin;
