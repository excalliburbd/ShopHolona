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
              if (response.length > 0) {
                dispatch(paymentandaddressActions.paymentsAndAddresses.done.get.bankBranch({id: bank, response}));
              }
            }
         )
}
