import { handleActions } from 'redux-actions';

import { paymentandaddressActions, shopActions } from '../actions';

export const banksReducer = handleActions({
  [paymentandaddressActions.paymentsAndAddresses.done.get.bank]: (state, action) => {
      const banks = state;

      action.payload.forEach(
        bank => {
          if(banks.indexOf(bank.id) === -1) {
            banks.unshift(bank.id)
          }
        }
      )

      return banks;
  }
}, [

]);

export const banksEntityReducer = handleActions({
  [paymentandaddressActions.paymentsAndAddresses.done.get.bank]: (state, action) => {
      const banks = {
        ...state
      }

      action.payload.forEach(
        bank => {
          if (banks[bank.id]) {
            banks[bank.id] = {
              ...banks[bank.id],
              ...bank,
            }
          } else {
            banks[bank.id] = {
              ...bank,
              branches: []
            }
          }
        }
      )

    return banks;
  },
  [paymentandaddressActions.paymentsAndAddresses.done.get.bankBranch]: (state, action) => {
    return {
      ...state,
      [action.payload.id]: {
        ...state[action.payload.id],
        branches: action.payload.response,
      }
    }
  }
}, {

});

export const addressesEntityReducer = handleActions({
  [paymentandaddressActions.paymentsAndAddresses.done.get.districts]: (state, action) => {
    return {
      ...state,
      districts: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.done.get.cities]: (state, action) => {
    return {
      ...state,
      cities: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.done.get.thanas]: (state, action) => {
    return {
      ...state,
      thanas: action.payload,
    }
  },
}, {
  districts: [],
  cities: [],
  thanas: [],
});

export const paymentandaddressUIReducer = handleActions({
  [paymentandaddressActions.paymentsAndAddresses.ui.set.bank]: (state, action) => {
    return {
      ...state,
      bank: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.bankId]: (state, action) => {
    return {
      ...state,
      bankID: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.branch]: (state, action) => {
    return {
      ...state,
      branch: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.branchId]: (state, action) => {
    return {
      ...state,
      branchID: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.account.name]: (state, action) => {
    return {
      ...state,
      accountName: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.account.number]: (state, action) => {
    return {
      ...state,
      accountNumber: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.district]: (state, action) => {
    return {
      ...state,
      district: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.districtId]: (state, action) => {
    return {
      ...state,
      districtID: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.city]: (state, action) => {
    return {
      ...state,
      city: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.cityId]: (state, action) => {
    return {
      ...state,
      cityID: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.thana]: (state, action) => {
    return {
      ...state,
      thana: action.payload,
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.thanaId]: (state, action) => {
    return {
      ...state,
      thanaID: action.payload,
    }
  },
  [shopActions.shop.set.address]: (state, action) => {
    if (action.payload[0] && action.payload[0].city && action.payload[0].thana && action.payload[0].district ) {
      const addressResponse = action.payload[0];

      return {
        ...state,
        district: addressResponse.district.name,
        districtID: addressResponse.district.id,
        city: addressResponse.city.name,
        cityID: addressResponse.city.id,
        thana: addressResponse.thana.name,
        thanaID: addressResponse.thana.id,
      }
    }

    return state;
  },
  [shopActions.shop.set.payments]: (state, action ) => {
    if (action.payload[0] && action.payload[0].bank) {
      return {
        ...state,
        bank: action.payload[0].bank.bankName,
        bankID: action.payload[0].bank.bank_name,
        branch: action.payload[0].bank.name,
        branchID: action.payload[0].bank.id,
        accountName: action.payload[0].account_name,
        accountNumber: action.payload[0].account_number,
      }
    }

    return state;
  },
}, {
  bank: '',
  bankID: null,
  branch: '',
  branchID: null,
  accountName: '',
  accountNumber: '',
  district: '',
  districtID: null,
  city: '',
  cityID: null,
  thana: '',
  thanaID: null,
});
