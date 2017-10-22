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
   cartActions,
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

export const trySignInAsyncAction = (res, hide, nextStep) =>  (dispatch, getState) => {
  const {
    demostore,
    shopID,
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
                if (hide) {
                  dispatch(sidebarActions.sidebar.hide());
                }
                dispatch(userActions.user.done.get.token(res.token));
                dispatch(getUserAddress(res.token));
                dispatch(getShopCategories(shopID));
                dispatch(tryGetVendor(shopID, res.token));
                dispatch(getFollowingShop(shopID, res.token));
                dispatch(getShopPayments(shopID, res.token));
                dispatch(validateCart(res.token));
                dispatch(getCart(res.token, false));
              }

              if (nextStep) {
                dispatch(nextStep);
              }
            }
          ).catch(
            err => {
              dispatch(userActions.user.ui.email(new Error(err)))
              console.log(err);
              dispatch(addNotification({
                title: 'Error during shop update',
                message: `${err}`,
                position: 'bl',
                status: 'error',
              }));
            }
          );
  }
}

export const getMe = (token, guest) => dispatch => {
    if (token) {
      request('/me/', getConfig(
          token
        )).then(
          res => {
            if (res.id) {
              if (guest) {
                dispatch(userActions.user.done.get.guestUser(res));
              } else {
                dispatch(userActions.user.done.get.profile(res));
              }
            }
          }
        ).catch(
          err => {
            if (guest) {
              dispatch(userActions.user.done.get.guestUser(new Error(err)));
            } else {
              dispatch(userActions.user.done.get.profile(new Error(err)));
            }
            dispatch(addNotification({
              title: 'Error during fetching profile',
              message: err,
              position: 'bl',
              status: 'error',
            }));
            !guest && dispatch(sidebarActions.sidebar.show.signIn());
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


export const getGuestUserAddress = token  => dispatch => {
  if (token) {
    request(`/me/address/`, getConfig(
              token
            )).then(
                res => {
                  if(res.length > 0) {
                    dispatch(userActions.user.set.guestUserAddresses(res));
                  }
                }
              );
  }
}

export const postUserAddress = (city, thana, title, details, primary, token, next)  => dispatch => {
  if (token) {
    request(`/me/address/`, getConfig(
              token,
              {
                city,
                thana,
                address_title: title,
                details,
                primary,
                postal_code: '1001',
              },
              'POST'
            )).then(
              res => {
                if(res.id) {
                  if (next) {
                    dispatch(next);
                    dispatch(getGuestUserAddress(token));
                  }
                }
              }
            );
  } else {
    dispatch(addNotification({
      title: 'Error',
      message: `You are not logged in`,
      position: 'bl',
      status: 'error',
    }));
  }
}

export const checkPhoneNumber = phone => dispatch => {
  request(`/users/?phone=${ encodeURIComponent(phone) }`, getConfig()).then(
    res => {
      dispatch(userActions.user.ui.setHasNumber(res.length > 0));
    }
  ).catch(
    err => {
      dispatch(addNotification({
        title: 'Error',
        message: `Error checking phone number`,
        position: 'bl',
        status: 'error',
      }));
    }
  )
}

export const registerUser = (phone, password) => dispatch => { //guest user for now
  request('/auth/register/', getConfig(
    null,
    {
      password,
      phone,
      'is_staff': false,
      'registered_as': '0',
      'vendor_status': '1',
    },
    'POST'
  )).then(
    res => {
      if (res.id) {
        dispatch(userActions.user.done.get.guestUser(res));
        dispatch(getGuestUserAddress(res.token));
      }
    }
  ).catch(
    err => {
      console.log(err);
      dispatch(addNotification({
         title: 'Error',
         message: `Error fetching verification code`,
         position: 'bl',
         status: 'error',
      }))
    }
  )
}

export const resendVerificationCode = phone => dispatch => {
  request('/auth/confirm-code-resend/', getConfig(
    null,
    {
      phone,
    },
    'POST',
  )).then(
    res => {
      dispatch(addNotification({
        title: 'Success',
        message: 'Verification code sent',
        position: 'bl',
        status: 'success',
      }));
    }
  )
}

export const patchMe = (body, token) => (dispatch, getState) => {
  request('/me/', getConfig(
    token,
    body,
    'PATCH'
  )).then(
    res => {
      dispatch(userActions.user.done.get.guestUser(res));
      dispatch(addNotification({
        title: 'Successfully Verified',
        message: `${ res.phone } is now verifed as ${ res.full_name }!`,
        position: 'bl',
        status: 'success',
      }));
    }
  )
}

export const postVerificationCode = (phone, code, fullName, next) => dispatch => {
  request('/auth/activate/', getConfig(
    null,
    {
      phone,
      code
    },
    'POST'
  )).then(
    res => {
      console.log(phone, code, fullName, next);
      if (res.token) {
        next();
        dispatch(validateCart(res.token));
        dispatch(userActions.user.set.guestUserToken(res.token));
        dispatch(patchMe({ full_name: fullName }, res.token));
      }
    }
  ).catch(
    err => {
      // const error = JSON.parse(err);

      // if (error) {
        // Object.keys(error).forEach(
          // field => {
            dispatch(addNotification({
              title: 'Error',
              message: `${err}`,
              position: 'bl',
              status: 'error',
            }));
          // }
        // )
      // }

    }
  )
}

export const changePassword = (oldPass, pass, token, phone, resetCart) => dispatch => {
  request('/auth/password/change/', getConfig(
    token,
    {
      'old_password': oldPass,
      'new_password': pass,
    },
    'POST',
  )).then(
    res => {
      dispatch(addNotification({
        title: 'Successfully Signed Up!',
        message: 'Welcome to ShopHobe!',
        position: 'bl',
        status: 'success',
      }));

      if (resetCart) {
        dispatch(cartActions.cart.reset());
      }
      dispatch(trySignInAsyncAction({phone, password: pass}, true, null));
    }
  ).catch(
    err => {
      console.log(err)
    }
  )
}
