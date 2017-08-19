import {
  handleActions,
  combineActions,
} from 'redux-actions';
import uuid from 'uuid';

import {
  shopActions,
  paymentandaddressActions
} from '../actions/';
import { REHYDRATE } from 'redux-persist/constants';

import config from '../config';

const shopInitialState = {
  id: null,
  shop_name: 'Loading',
  short_descr: 'Loading',
  prof_pic: null,
  cover_photo: null,
  contacts: [],
  address: [{
    id: null,
    city: {
      id: null,
      district: null,
      country: 'Loading',
      name: 'Loading',
      bang_country: '',
      bang_name: ''
    },
    thana: {
      id: null,
      city: null,
      name: 'Loading'
    },
    district: {
      id: null,
      name: 'Loading'
    },
    address_title: 'Loading',
    details: 'Loading',
    postal_code: 'Loading',
    long: 0.00000000,
    lat: 0.00000000,
    bang_title: 'Loading',
    bang_details: 'Loading',
    primary: true,
    pickup_address: false
  }],
  payments: [
    {
      id: null,
      bank: {
          id: null,
          name: 'loading',
          bank_name: null
      },
      account_name: '',
      account_type: 0,
      account_number: null,
      bkash_num: ''
    }
  ],
  information: {
    upToDate: false,
    editing: [],
    name: 'loading',
    domain: 'loading',
    address: [{
      id: null,
      city: {
        id: null,
        district: null,
        country: 'Loading',
        name: 'Loading',
        bang_country: '',
        bang_name: ''
      },
      thana: {
        id: null,
        city: null,
        name: 'Loading'
      },
      district: {
        id: null,
        name: 'Loading'
      },
      address_title: 'Loading',
      details: 'Loading',
      postal_code: 'Loading',
      long: 0.00000000,
      lat: 0.00000000,
      bang_title: 'Loading',
      bang_details: 'Loading',
      primary: true,
      pickup_address: false
    }],
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
    payments: [
      {
        id: null,
        bank: {
            id: null,
            name: 'loading',
            bank_name: null
        },
        account_name: 'loading',
        account_type: 0,
        account_number: null,
        bkash_num: ''
      }
    ],
    fcom: false,
    physical_store: false,
    description: 'loading'
  },
  referral: {
    code: 'loading'
  },
  demostore: config.demostore,
}

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
          physical_store,
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
            physical_store,
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
      return {
        ...state,
        address: action.payload,
        information: {
          ...state.information,
          address: action.payload,
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
          address: [{
            ...state.information.address[0],
            details: action.payload,
          }],
        }
      }
    },
    [shopActions.shop.edit.postal]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('address') === -1 ) ?
                    [ ...state.information.editing, 'address' ]:
                    state.information.editing,
          address: [{
            ...state.information.address[0],
            postal_code: action.payload,
          }],
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
          license: {
            ...state.information.license,
            number: action.payload,
          },
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
        shop_name: action.payload,
        information: {
          ...state.information,
          name: action.payload,
        },
      }
    },
    [shopActions.shop.set.payments]: (state, action) => {
      return {
        ...state,
        payments: action.payload,
        information: {
          ...state.information,
          payments: action.payload,
        },
      }
    },
    [combineActions(
      paymentandaddressActions.paymentsAndAddresses.ui.set.bank,
      paymentandaddressActions.paymentsAndAddresses.ui.set.bankId,
      paymentandaddressActions.paymentsAndAddresses.ui.set.branch,
      paymentandaddressActions.paymentsAndAddresses.ui.set.branchId,
      paymentandaddressActions.paymentsAndAddresses.ui.set.account.name,
      paymentandaddressActions.paymentsAndAddresses.ui.set.account.number
    )]: (state, action) => {
      return {
        ...state,
        information: {
          ...state.information,
          editing: (state.information.editing.indexOf('payments') === -1 ) ?
                    [ ...state.information.editing, 'payments' ]:
                    state.information.editing,
        }
      }
    },
    [REHYDRATE]: (state, action) => {
      const incoming = action.payload.shop;

      return {
        ...state,
        ...incoming,
        information: shopInitialState.information,
        demostore: config.demostore,
      }
    },
    [shopActions.shop.set.demo.profPic]: (state, action) => {
      return {
        ...state,
        prof_pic: action.payload,
      }
    },
    [shopActions.shop.set.demo.cover]: (state, action) => {
      return {
        ...state,
        cover_photo: action.payload,
      }
    },
}, shopInitialState );

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
