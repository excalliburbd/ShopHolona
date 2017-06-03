import { request, getConfig } from './helpers';

import { getShopCategories } from '../actions/shopActions';

export const trySignInAsyncAction = ({ email, password }, shop) => dispatch => {

  const credentials = {};

  if(email && password) {
    credentials.email = email;
    credentials.password = password;
  }

  dispatch({
    type: 'USER_TRY_SIGNIN'
  });

  request('/api/auth/login/', getConfig(
            null,
            credentials,
            'post'
          )).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              request('/api/me/', getConfig(
                res.token
              )).then(
                res => {
                  dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

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
                  type: 'SET_API_USER_TOKEN',
                  payload: res.token,
                });

                dispatch({
                  type: 'HIDE_SIDEBAR',
                });

                dispatch(getShopCategories(shop));

              }else{
                dispatch({
                  type: 'SET_USER_UI_EMAIL_ERROR'
                })
              }
            }
          );
}

export const getMe = (token, shop) => dispatch => {
    request('/api/me/', getConfig(
          token
        )).then(
          res => {
            dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

            if (res.id) {
              dispatch({
                type: 'USER_SET_PROFILE',
                payload: res,
              });
            }
          }
        )
}
