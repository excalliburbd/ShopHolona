import { handleActions } from 'redux-actions';

import { shopActions } from '../actions/';
import { REHYDRATE } from 'redux-persist/constants';

export const ShopPageReducer = handleActions({
    [shopActions.shop.set.shop]: (state, action) => {
      if (!state.information.editing) {
        const {
          shop_name,
          subdomain,
          contacts,
          hours_from,
          hours_to,
          trade_license_number,
          trade_license_image
        } = action.payload;

        return {
          ...state,
          ...action.payload,
          information: {
            ...state.information,
            upToDate: true,
            name: shop_name,
            domain: subdomain,
            phone: contacts[0].description,
            hours: {
              from: hours_from,
              to: hours_to,
            },
            license: {
              number: trade_license_number,
              image: trade_license_image,
            }
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

      const address = action.payload[0]

      return {
        ...state,
        address: action.payload,
        information: {
          ...state.information,
          address: {
            body: address.details,
            city: address.city.city,
            postal: address.postal_code
          }
        }
      }
    },
    [REHYDRATE]: (state, action) => {
      const incoming = action.payload.shop;

      return {
        ...state,
        ...incoming,
        information: {
          upToDate: false,
          editing: false,
          name: 'loading',
          domain: 'loading',
          address: {
            body: 'loading',
            city: 'loading',
            postal: 'loading'
          },
          hours: {
            from: new Date(),
            to: new Date(),
          },
          phone: 'loading',
          license: {
            number: 'loading',
            img: 'https://unsplash.it/480/480'
          },
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
    name: 'loading',
    domain: 'loading',
    address: {
      body: 'loading',
      city: 'loading',
      postal: 'loading'
    },
    hours: {
      from: new Date(),
      to: new Date(),
    },
    phone: 'loading',
    license: {
      number: 'loading',
      img: 'https://unsplash.it/480/480'
    },
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
