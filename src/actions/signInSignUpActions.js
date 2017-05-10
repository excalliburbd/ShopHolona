import fetch from 'isomorphic-fetch';

export const trySignInAsyncAction = ({ email, password }) => dispatch => {

  const credentials = {};

  if(email && password) {
    credentials.email = email;
    credentials.password = password;
  }

  dispatch({
    type: 'USER_TRY_SIGNIN'
  });

  fetch('http://shophobe-development.herokuapp.com/api/auth/login/', {
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
              if(res.token){
                dispatch({
                  type: 'USER_SET_TOKEN',
                  token: res.token,
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
