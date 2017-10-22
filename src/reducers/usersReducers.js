import { handleActions } from 'redux-actions';

import { userActions, sidebarActions } from '../actions/';
import { REHYDRATE } from 'redux-persist/constants';

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
    shopvendor: false,
    following: [],
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
        shopvendor: false,
        following: [],
      }
    }
  },
  [userActions.user.done.get.authShop]: {
    next(state, action) {
      return {
        ...state,
        shopvendor: true
      }
    },
    throw(state, action) {
      return {
        ...state,
        shopvendor: false,
      }
    }
  },
  [userActions.user.done.get.followingShops]: (state, action) => ({
      ...state,
      following: action.payload,
  }),
  [userActions.user.set.followingShop]: (state, action) => {
    const exists = state.following.some( following => following.shop.id === action.payload.shop.id );

    if (exists.lenght > 0) {
      return {
        ...state,
      }
    }

    return {
      ...state,
      following: [
        ...state.following,
        action.payload
      ]
    }
  },
  [userActions.user.delete.followingShop]: (state, action) => {
    return {
      ...state,
      following: state.following.filter( shop => shop.id !== action.payload),
    }
  },
  [userActions.user.set.address]: (state, action) => {
    return {
      ...state,
      addresses: action.payload,
    }
  },
  [REHYDRATE]: (state, action) => {
      const incoming = action.payload.user;

      return {
        ...state,
        ...incoming,
        shopvendor: false,
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
  shopvendor: false,
  following: [],
  addresses: [],
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
          address: '',
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
  [userActions.user.ui.address]: (state, action) => ({
        ...state,
        address: action.payload,
      }),
  [userActions.user.manualSignOut]: (state, action) => ({
    email: '',
    emailPassword: '',
    password: '',
    phonePassword: '',
    error: false,
    address: '',
    phone: {
      validating: false,
      hasNumber: null,
      number: null,
    },
    guestUser: {
      id: null,
      token: null,
      addresses: [],
      password: '',
    }
  }),
  [userActions.user.ui.updatePhone]: (state, action) => ({
    ...state,
    phone: {
      ...state.phone,
      number: action.payload,
    }
  }),
  [userActions.user.ui.setHasNumber]: (state, action) => ({
    ...state,
    phone: {
      ...state.phone,
      hasNumber: action.payload,
    }
  }),
  [userActions.user.done.get.guestUser]: (state, action) => ({
    ...state,
    guestUser: {
      ...state.guestUser,
      ...action.payload,
    }
  }),
  [sidebarActions.sidebar.hide]: (state, action) => ({
    ...state,
    phone: {
      validating: false,
      hasNumber: null,
      number: null,
    },
    guestUser: {
      id: null,
      token: null,
      addresses: [],
      password: '',
    }
  }),
  [userActions.user.set.guestUserAddresses]: (state, action) => {
    return {
      ...state,
      guestUser: {
        ...state.guestUser,
        addresses: action.payload,
      }
    }
  },
  [userActions.user.set.guestUserToken]: (state, action) => {
    return {
      ...state,
      guestUser: {
        ...state.guestUser,
        token: action.payload,
      }
    }
  },
  [userActions.user.set.guestUserPassword]: (state, action) => {
    return {
      ...state,
      guestUser: {
        ...state.guestUser,
        password: action.payload,
      }
    }
  },
}, {
  email: '',
  emailPassword: '',
  password: '',
  phonePassword: '',
  error: false,
  address: '',
  phone: {
    validating: false,
    hasNumber: null,
    number: null,
  },
  guestUser: {
    id: null,
    token: null,
    addresses: [],
    password: '',
  }
});
