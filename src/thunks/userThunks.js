import { request, getConfig } from './helpers';

import { getShopCategories } from './shopThunks';

import {
   userActions,
   sidebarActions,
} from '../actions/';

export const trySignInAsyncAction = (res, shop) => dispatch => {

  const credentials = {};

  if(res.email && res.password) {
    credentials.email = res.email;
    credentials.password = res.password;
  }

  if(res.phone && res.password) {
    credentials.phone = res.phone;
    credentials.password = res.password;
  }

  request('/auth/login/', getConfig(
            null,
            credentials,
            'post'
          )).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              request('/me/', getConfig(
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
    request('/me/', getConfig(
          token
        )).then(
          res => {
            dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

            if (res.id) {
              dispatch(userActions.user.done.get.profile(res));
            }
          }
        ).catch(
          err => {
            dispatch(userActions.user.done.get.profile(new Error(err)));
            dispatch(sidebarActions.sidebar.show.signIn());
          }
        )
}
