import { handleActions } from 'redux-actions';

import { paymentandaddressActions } from '../actions';

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
  }
}, {
  bank: '',
  bankID: null,
  branch: '',
  branchID: null,
  accountName: '',
  accountNumber: '',
});
