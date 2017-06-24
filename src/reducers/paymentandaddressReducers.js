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

      console.log( action.payload)

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
            }
          }
        }
      )

    return banks;
  }
}, {

});

export const paymentandaddressUIReducer = handleActions({
  [paymentandaddressActions.paymentsAndAddresses.ui.set.bank]: (state, action) => {
    return {
      ...state,
      bank: action.payload
    }
  },
  [paymentandaddressActions.paymentsAndAddresses.ui.set.bankId]: (state, action) => {
    return {
      ...state,
      bankID: action.payload
    }
  }
}, {
  bank: '',
  bankID: null,
});
