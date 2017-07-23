import { handleActions } from 'redux-actions';
import uuid from 'uuid';

import { shopActions } from '../actions/';
import { REHYDRATE } from 'redux-persist/constants';

import config from '../config';

export const ShopPageReducer = handleActions({
    [shopActions.shop.set.shop]: (state, action) => {
      if (state.information.editing.length === 0) {
        const {
          shop_name,
          contacts,
          trade_license_number,
          trade_license_image,
          fcom,
          short_descr,
        } = action.payload;

        return {
          ...state,
          ...action.payload,
          information: {
            ...state.information,
            upToDate: true,
            name: shop_name,
            phone: (contacts[0]) ? {
              id: contacts[0].id,
              number:contacts[0].description,
            } : {
              id: null,
              number: 'loading',
            },
            license: {
              number: trade_license_number,
              image: trade_license_image,
            },
            fcom,
            description: short_descr,
          }
        }
      }

      return state;
    },
    [shopActions.shop.set.id]: (state, action) => ({
        ...state,
        id: action.payload,
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
    [shopActions.shop.set.hours]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          hours: {
            ...action.payload,
            from_hour: new Date(`1993-04-19 ${action.payload.from_hour}`),
            to_hour: new Date(`1993-04-19 ${action.payload.to_hour}`)
          },
        }
      }
    },
    [shopActions.shop.set.fromHour]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          hours: {
            ...state.information.hours,
            from_hour: new Date(`1993-04-19 ${action.payload.from_hour}`)
          },
        }
      }
    },
    [shopActions.shop.set.toHour]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          hours: {
            ...state.information.hours,
            to_hour: new Date(`1993-04-19 ${action.payload.to_hour}`)
          },
        }
      }
    },
    [shopActions.shop.edit.name]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('name') === -1 ) ?
                    [ ...state.information.editing, 'name' ]:
                    state.information.editing,
          name: action.payload,
        }
      }
    },
    [shopActions.shop.edit.phone]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('phone') === -1 ) ?
                    [ ...state.information.editing, 'phone' ]:
                    state.information.editing,
          phone: {
            ...state.information.phone,
            number: action.payload,
          },
        }
      }
    },
    [shopActions.shop.edit.address]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('address') === -1 ) ?
                    [ ...state.information.editing, 'address' ]:
                    state.information.editing,
          address: {
            ...state.information.address,
            body: action.payload,
          },
        }
      }
    },
    [shopActions.shop.edit.city]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('city') === -1 ) ?
                    [ ...state.information.editing, 'city' ]:
                    state.information.editing,
          address: {
            ...state.information.address,
            city: action.payload,
          },
        }
      }
    },
    [shopActions.shop.edit.postal]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('postal') === -1 ) ?
                    [ ...state.information.editing, 'postal' ]:
                    state.information.editing,
          address: {
            ...state.information.address,
            postal: action.payload
          },
        }
      }
    },
    [shopActions.shop.edit.fromHour]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('from_hour') === -1 ) ?
                    [ ...state.information.editing, 'from_hour' ]:
                    state.information.editing,
          hours: {
            ...state.information.hours,
            from_hour: action.payload,
          },
        }
      }
    },
    [shopActions.shop.edit.toHour]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('to_hour') === -1 ) ?
                    [ ...state.information.editing, 'to_hour' ]:
                    state.information.editing,
          hours: {
            ...state.information.hours,
            to_hour: action.payload,
          },
        }
      }
    },
    [shopActions.shop.edit.licenseNumber]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('license') === -1 ) ?
                    [ ...state.information.editing, 'license' ]:
                    state.information.editing,
          licenseNumber: action.payload,
        }
      }
    },
    [shopActions.shop.edit.description]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('description') === -1 ) ?
                    [ ...state.information.editing, 'description' ]:
                    state.information.editing,
          description: action.payload,
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
          editing: [],
          name: 'loading',
          domain: 'loading',
          address: {
            body: 'loading',
            city: 'loading',
            postal: 'loading'
          },
          hours: {
            id: uuid.v4(),
            weekday: 1,
            from_hour: new Date('1993-04-19 09:00:00'),
            to_hour: new Date('1993-04-19 21:00:00'),
          },
          phone: {
            id: null,
            number: 'loading',
          },
          license: {
            number: 'loading',
            img: 'https://unsplash.it/480/480'
          },
          fcom: false,
          description: 'loading',
        },
        demostore: config.demostore,
      }
    },
  [shopActions.shop.set.editing]: (state, action) => {
    return {
      ...state,
      information: {
        ...state.information,
        editing: action.payload,
      }
    }
  },
  [shopActions.shop.set.name]: (state, action) => {
    return {
      ...state,
      shop_name: action.payload
    }
  },
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
    editing: [],
    name: 'loading',
    domain: 'loading',
    address: {
      body: 'loading',
      city: 'loading',
      postal: 'loading'
    },
    hours: {
      id: uuid.v4(),
      weekday: 1,
      from_hour: new Date('1993-04-19 09:00:00'),
      to_hour: new Date('1993-04-19 21:00:00'),
    },
    phone: {
      id: null,
      number: 'loading',
    },
    license: {
      number: 'loading',
      img: 'https://unsplash.it/480/480'
    },
    bank: {

    },
    fcom: false,
    description: 'loading'
  },
  referral: {
    code: 'loading'
  },
  demostore: config.demostore,
})

export const ShopPageUIReducer = handleActions({
    [shopActions.shop.toggleDetails]: (state, action) => ({
        ...state,
        details: !state.details,
      }),
    [shopActions.shop.updateChip]: (state, action) => ({
        ...state,
        chip: action.payload,
      }),
    [shopActions.shop.toggle.productDetails]: (state, action) => ({
      ...state,
      showProductDetails: !state.showProductDetails,
      product: (action.payload ) ? action.payload : null,
    }),
    [shopActions.shop.set.detailsTab]: (state, action) => ({
      ...state,
      detailsTab: action.payload,
    }),
    [shopActions.shop.set.editDesc]: (state, action) => ({
      ...state,
      editDesc: action.payload,
    })
}, {
  details: true,
  chip: 0,
  showProductDetails: false,
  product: null,
  detailsTab: 0,
  editDesc: false,
})
