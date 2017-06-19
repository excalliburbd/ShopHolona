import { handleActions } from 'redux-actions';

import { userActions } from '../actions/';

export const UserReducer = handleActions({
  [userActions.user.manualSignOut]: (state, action) => ({
        isLoggedIn: false,
        token: null,
        registered_as: null,
        referral: {
          code: 'loading'
        },
        last_login: null,
        full_name: '',
        email: '',
        phone_verified: false,
        email_verified: false,
      }),
  [userActions.user.done.get.token]: (state, action) => ({
        ...state,
        isLoggedIn: true,
        token: action.payload,
      }),
  [userActions.user.done.get.profile]: {
    next(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    throw(state, action) {
      return {
        isLoggedIn: false,
        token: null,
        registered_as: null,
        referral: {
          code: 'loading'
        },
        last_login: null,
        full_name: '',
        email: '',
        phone_verified: false,
        email_verified: false,
      }
    }
  },
}, {
  isLoggedIn: false,
  token: null,
  registered_as: null,
  referral: {
    code: 'loading'
  },
  last_login: null,
  full_name: '',
  email: '',
  phone_verified: false,
  email_verified: false,
});

export const UserUIReducer = handleActions({
  [userActions.user.ui.email]: {
      next(state, action) {
        return {
          ...state,
          email: action.payload,
        }
      },
      throw(state, action) {
        return {
          ...state,
          email: state.email,
          emailPassword: '',
          error: true,
        }
      }
    },
  [userActions.user.ui.emailPassword]: (state, action) => ({
       ...state,
       emailPassword: action.payload,
     }),
  [userActions.user.ui.phone]: (state, action) => ({
       ...state,
       phonePassword: action.payload,
     }),
  [userActions.user.ui.phonePassword]: (state, action) => ({
        ...state,
        phone: action.payload,
      }),
  [userActions.user.manualSignOut]: (state, action) => ({
      email: '',
      emailPassword: '',
      password: '',
      phonePassword: '',
      error: false,
  }),
}, {
  email: '',
  emailPassword: '',
  password: '',
  phonePassword: '',
  error: false,
});
