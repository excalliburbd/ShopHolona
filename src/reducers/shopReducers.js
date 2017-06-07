import { handleActions } from 'redux-actions';

import { shopActions } from '../actions/';
import { REHYDRATE } from 'redux-persist/constants';

export const ShopPageReducer = handleActions({
    [shopActions.shop.set.shop]: (state, action) => {
      if (!state.information.editing) {
        return {
          ...state,
          ...action.payload,
          information: {
            ...state.information,
            upToDate: true,
            name: action.payload.shop_name,
          }
        }
      }

      return state;
    },
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
    },
    [REHYDRATE]: (state, action) => {
      const incoming = action.payload.shop;

      return {
        ...state,
        ...incoming,
        information: {
          upToDate: false,
          name: 'loading',
        }
      }
    },
    [shopActions.shop.edit.name]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: true,
          name: action.payload,
        }
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

  },
  information: {
    upToDate: false,
    editing: false,
    name: 'loading'
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
      }),
}, {
  details: false,
  chip: 0,
})
