import { addNotification } from 'reapop';

import { request, getConfig, fromState } from './helpers';

import {
  getShopCategories,
  getShopHours,
  getShopPayments,
} from '../thunks/shopThunks';
import { getOrderList } from '../thunks/ordersThunks';
import {
  getCart,
  validateCart,
} from '../thunks/cartThunks';

import {
   userActions,
   sidebarActions,
} from '../actions/';

export const tryGetVendor = (shop, token) => dispatch => {
  if (token) {
    request(`/vendors/shops/${shop}/`, getConfig(
              token
            )).then(
              res => {
                if( res.id ) {
                  dispatch(getShopPayments(shop, token));
                  dispatch(userActions.user.done.get.authShop());
                  dispatch(getShopHours(shop, token));
                  dispatch(getOrderList(shop, token));
                }
              }
            ).catch(
              err => userActions.user.done.get.authShop(new Error(err))
            );
  }
}

export const getFollowingShop = (shop, token) => dispatch => {
  if (token) {
    request('/me/following-shops/', getConfig(
            token
          )).then(
            res => {
              if( res.length > 0 ) {
                dispatch(userActions.user.done.get.followingShops(res));
              }
            }
          ).catch(
            err => {
              console.log(err)
              // dispatch(addNotification({
              //     title: 'Error during fetching following shop',
              //     message: err,
              //     position: 'bl',
              //     status: 'error',
              // }));
            }
          );
  }
}

export const trySignInAsyncAction = (res, shop) =>  (dispatch, getState) => {
  const {
    demostore,
  } = fromState(getState);

  if (demostore) {
    dispatch(addNotification({
        title: 'Sorry for the confusion',
        message: 'You shouldn\'t login to the demostore',
        position: 'bl',
        status: 'warning',
    }));
  } else {
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
              request('/me/', getConfig(
                res.token
              )).then(
                res => {
                  if (res.id) {
                    dispatch(userActions.user.done.get.profile(res));
                    demostore && dispatch(addNotification({
                        title: 'Success',
                        message: 'Successfully signed in',
                        position: 'bl',
                        status: 'success',
                    }));
                  }
                }
              )

              if(res.token){
                dispatch(userActions.user.done.get.token(res.token));
                dispatch(sidebarActions.sidebar.hide());
                dispatch(getShopCategories(shop));
                dispatch(tryGetVendor(shop, res.token));
                dispatch(getFollowingShop(shop, res.token));
                dispatch(getShopPayments(shop, res.token));
                dispatch(validateCart(res.token));
                dispatch(getCart(res.token, false));
              }
            }
          ).catch(
            err => {
              dispatch(userActions.user.ui.email(new Error(err)))
              dispatch(addNotification({
                title: 'Error during shop update',
                message: err,
                position: 'bl',
                status: 'error',
              }));
            }
          );
  }
}

export const getMe = token => dispatch => {
    if (token) {
      request('/me/', getConfig(
          token
        )).then(
          res => {
            if (res.id) {
              dispatch(userActions.user.done.get.profile(res));
            }
          }
        ).catch(
          err => {
            dispatch(userActions.user.done.get.profile(new Error(err)));
            dispatch(addNotification({
              title: 'Error during fetching profile',
              message: err,
              position: 'bl',
              status: 'error',
            }));
            dispatch(sidebarActions.sidebar.show.signIn());
          }
        );
    }
}

export const followShop = (shop, token, name) => dispatch => {
  if (token) {
    request('/me/following-shops/', getConfig(
            token,
            {
              shop
            },
            'POST'
          )).then(
            res => {
              if( res.id ) {
                dispatch(userActions.user.set.followingShop(res));
                dispatch(addNotification({
                  title: 'Success',
                  message: `You are now following ${ name }!`,
                  position: 'bl',
                  status: 'success',
                }));
              }
            }
          ).catch(
            err => {
              dispatch(addNotification({
                title: 'Error following shop!',
                message: err,
                position: 'bl',
                status: 'error',
              }));
            }
          );
  }
}

export const unfollowShop = (shop, token, name, id) => dispatch => {
  if (token) {
    request(`/me/unfollow-shops/${id}`, getConfig(
            token,
            null,
            'DELETE'
          )).then(
            res => {
              dispatch(userActions.user.delete.followingShop(id));
              dispatch(addNotification({
                title: 'Success',
                message: `You unfollowed ${ name }!`,
                position: 'bl',
                status: 'success',
              }));
            }
          ).catch(
            err => {
              dispatch(addNotification({
                title: 'Error!',
                message: err,
                position: 'bl',
                status: 'error',
              }));
            }
          );
  }
}

export const getUserAddress = token  => dispatch => {
  if (token) {
    request(`/me/address/`, getConfig(
              token
            )).then(
                res => {
                  if(res.length > 0) {
                    dispatch(userActions.user.set.address(res));
                  }
                }
              );
  }
}
