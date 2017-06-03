export const ShopPageReducer = (
  state = {
    id: null,
    shop_name: 'Loading',
    short_descr: 'Loading',
    prof_pic: 'https://unsplash.it/160/160',
    cover_photo: 'https://unsplash.it/1200/700',
    contacts: [],
    address: {

    }
  }, action
) => {
  switch (action.type) {
    case 'SET_SHOP':
      return {
        ...state,
        ...action.payload,
      }
    case 'SET_SHOP_ID':
      return {
        ...state,
        id: action.payload,
      }
    case 'SET_SHOP_CONTACT_NUMBER':
      return {
        ...state,
        contacts: state.contacts.map(
          contact => {
            if (contact.id === action.payload.id) {
              return {
                ...contact,
                description: action.payload.value,
              }
            }

            return contact;
          }
        )
      }
    case 'SET_SHOP_ADDRESS':
      const addresses = {};

      action.payload.forEach(
        obj => {
          addresses[obj.id] = obj;
        }
      )

      return {
        ...state,
        address: addresses
      }
    default:
      return state;
  }
}

export const ShopPageUIReducer = (
  state = {
    details: false,
    chip: 0,
  } , action
) => {
  switch (action.type) {
    case 'TOGGLE_SHOPPAGE_UI_DETAILS':
      return {
        ...state,
        details: !state.details,
      }
    case 'UPDATE_SHOP_CHIP':
      return {
        ...state,
        chip: action.payload,
      }
    default:
      return state;
  }
}
