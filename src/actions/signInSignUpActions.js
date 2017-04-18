import fetch from 'isomorphic-fetch';

export const trySignInAsyncAction = ({ email, password }) => dispatch => {

  const credentials = {};

  if(email && password) {
    credentials.email_username = email;
    credentials.password = password;
  }

  dispatch({
    type: 'USER_TRY_SIGNIN'
  });

  fetch('http://192.168.1.21:8000/api/users/login/', {
            method: 'post',
            body: JSON.stringify(credentials),
            mode: 'cors',
            headers: {
              "Accept": "application/json",
              'Content-type': 'application/json; charset=utf-8',
            },

          }).then(
            res => res.json()
          ).then(
            res => {
              if(res.user){
                dispatch({
                  type: 'USER_SET_TOKEN',
                  token: res.user.token,
                });
                dispatch({
                  type: 'HIDE_SIDEBAR',
                });
              }else{
                console.log(res)

                dispatch({
                  type: 'SET_USER_UI_EMAIL_ERROR'
                })
              }
            }
          );
}
