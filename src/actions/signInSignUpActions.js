import fetch from 'isomorphic-fetch';

import { getShopCategories } from '../actions/shopActions';

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
              fetch('http://shophobe-development.herokuapp.com/api/me', {
                headers: {
                    "Accept": "application/json",
                    'Content-type': 'application/json; charset=utf-8',
                    'Authorization': `JWT ${res.token}`,
                  },
              })
              .then(
                res => res.json()
              ).then(
                res => {
                  if (res.id) {
                    dispatch({
                      type: 'USER_SET_PROFILE',
                      payload: res,
                    });
                  }
                }
              )

              if(res.token){
                dispatch({
                  type: 'USER_SET_TOKEN',
                  token: res.token,
                });



                dispatch({
                  type: 'HIDE_SIDEBAR',
                });

                dispatch(getShopCategories(res.token, 3));

              }else{
                console.log(res)

                dispatch({
                  type: 'SET_USER_UI_EMAIL_ERROR'
                })
              }
            }
          );
}
