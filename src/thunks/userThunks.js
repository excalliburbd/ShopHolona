import { request, getConfig } from './helpers';

import { getShopCategories } from './shopThunks';

import {
   userActions,
   sidebarActions,
} from '../actions/';

export const tryGetVendor = (shop, token) => dispatch => {
  if (token) {
    request(`/vendors/shops/${shop}`, getConfig(
            token
          )).then(
            res => {
              if( res.id ) {
                dispatch(
                  userActions.user.done.get.authShop()
                )
              }
            }
          ).catch(
            err => userActions.user.done.get.authShop(new Error(err))
          );
  }
}

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
            'POST'
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

                dispatch(tryGetVendor(shop, res.token));

              }
            }
          ).catch(
            err => {
              dispatch(userActions.user.ui.email(new Error(err)))
            }
          );
}

export const getMe = (token, shop) => dispatch => {
    if (token) {
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
        );
    }
}
