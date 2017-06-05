import { handleActions } from 'redux-actions';

import { shopActions } from '../actions/';

export const ShopPageReducer = handleActions({
    [shopActions.shop.set.shop]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    [shopActions.shop.set.id]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    [shopActions.shop.set.contactNumber]: (state, action) => ({
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
      }),
    [shopActions.shop.set.address]: (state, action) => {
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
    }
}, {
  id: null,
  shop_name: 'Loading',
  short_descr: 'Loading',
  prof_pic: 'https://unsplash.it/160/160',
  cover_photo: 'https://unsplash.it/1200/700',
  contacts: [],
  address: {

  }
})

export const ShopPageUIReducer = handleActions({
    [shopActions.shop.toggleDetails]: (state, action) => ({
        ...state,
        details: !state.details,
      }),
    [shopActions.shop.updateChip]:  (state, action) => ({
        ...state,
        chip: action.payload,
      })
}, {
  details: false,
  chip: 0,
})
