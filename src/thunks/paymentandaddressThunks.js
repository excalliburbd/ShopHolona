import { request, getConfig } from './helpers';

import { paymentandaddressActions } from '../actions';

export const getBanks = () => dispatch => {
  request('/banks/', getConfig()).then(
            res => {
              if (res.length > 0) {
                dispatch(paymentandaddressActions.paymentsAndAddresses.done.get.bank(res));
              }
            }
          );
}

export const getBranch = bank => dispatch => {
  request(`/banks/${bank}/branches/`, getConfig()).then(
            response => {
              console.log(response)
              if (response.length > 0) {
                dispatch(paymentandaddressActions.paymentsAndAddresses.done.get.bankBranch({id: bank, response}));
              }
            }
         )
}

export const saveBankInfo = (branch, account, shop, token) => dispatch => {
  if (token) {
    request(`/vendors/shops/${shop}/payments/`, getConfig(
            token,
            {
              bank: branch,
              account_name: account,
              account_type: '1'
            },
            'POST'
          )).then(
            response => {
              console.log(response)
            }
         );
  }
}
