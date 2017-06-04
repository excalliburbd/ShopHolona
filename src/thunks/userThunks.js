import { request, getConfig } from './helpers';

import { getShopCategories } from './shopThunks';

import { userActions } from '../actions/';
import { sidebarActions } from '../actions/';

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
                    dispatch(userActions.user.done.get.profile(res));
                  }
                }
              )

              if(res.token){
                dispatch(userActions.user.done.get.token(res.token));



                dispatch(sidebarActions.sidebar.hide());

                dispatch(getShopCategories(shop));

              }
            }
          ).catch(
            err => {
              dispatch(userActions.user.ui.email(new Error(err)))
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
              dispatch(userActions.user.done.get.profile(res));
            }
          }
        )
}
