
export const UserReducer = (
  state = {
    isLoggedIn: false,
    token: null,
    registered_as: null,
    referral: {
      code: 'loading'
    }
  }, action
) => {
  switch (action.type) {
    case 'USER_MANUAL_SIGNOUT':
      return {
        isLoggedIn: false,
        token: null,
        registered_as: null,
        referral: {
          code: state.referral.code,
        }
      }
    case 'USER_SET_TOKEN':
      return {
        ...state,
        token: action.token,
        isLoggedIn: true,
      }
    case 'USER_SET_PROFILE':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}

export const UserUIReducer = (
  state = {
    email: '',
    emailPassword: '',
    password: '',
    phonePassword: '',
    error: false,
  }, action
) => {
  switch (action.type) {
    case 'UPDATE_USER_UI_EMAIL':
      return {
        ...state,
        email: action.val,
      }
    case 'UPDATE_USER_UI_EMAIL_PASSWORD':
     return {
       ...state,
       emailPassword: action.val,
     }
    case 'UPDATE_USER_UI_PHONE_PASSWORD':
     return {
       ...state,
       phonePassword: action.val,
     }
    case 'UPDATE_USER_UI_PHONE':
      return {
        ...state,
        phone: action.val,
      }
    case 'SET_USER_UI_EMAIL_ERROR':
      return {
        ...state,
        email: '',
        emailPassword: '',
        error: true,
      }
    default:
      return state;
  }
}
