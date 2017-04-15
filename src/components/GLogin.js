import React from 'react';
import FaGoogle from 'react-icons/lib/fa/google';
import Button from 'react-toolbox/lib/button/Button';

class GLogin extends React.Component{
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
  }

  componentDidMount () {
    (function(d, s, id){
     var js, gs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = 'https://apis.google.com/js/platform.js'
     gs.parentNode.insertBefore(js, gs);
   }(document, 'script', 'google-platform'));
  }

  checkLoginState (response) {
    if (window.auth2.isSignedIn.get()) {
      var profile = window.auth2.currentUser.get().getBasicProfile();
    } else {
      if(this.props.responseHandler) {
        this.props.responseHandler({status: response.status});
      }
    }
  }

  clickHandler () {
    const socialId = '432434621552-kne26sb1jke6er2ucqp4k5shipmtad8s.apps.googleusercontent.com';

    const responseHandler = googleUser => {
                  var id_token = googleUser.getAuthResponse().id_token;
                  console.log({accessToken: id_token});

                  var profile = googleUser.getBasicProfile();
                  console.dir(profile);
                  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
                  console.log('Full Name: ' + profile.getName());
                  console.log('Given Name: ' + profile.getGivenName());
                  console.log('Family Name: ' + profile.getFamilyName());
                  console.log("Image URL: " + profile.getImageUrl());
                  console.log("Email: " + profile.getEmail());
                };

    const scope = "profile email openid";

    window.gapi.load('auth2', function() {
      var auth2 = window.gapi.auth2.init({
        client_id: socialId,
        fetch_basic_profile: false,
        scope: scope
      });
      auth2.signIn().then(function(googleUser) {
        responseHandler(googleUser);
      });
    });
  }

  render () {
    return (
      <div>
        <Button raised onClick={ this.clickHandler }>
          <FaGoogle /> using Google
        </Button>
      </div>
    )
  }
}


export default GLogin;

