import { request, getConfig } from './helpers';

import { paymentandaddressActions } from '../actions';
import { addNotification } from 'reapop';

export const getBanks = () => dispatch => {
  request('/banks/', getConfig()).then(
            res => {
              if (res.length > 0) {
                dispatch(paymentandaddressActions.paymentsAndAddresses.done.get.bank(res));
                dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfully updated product name',
                  position: 'bl',
                  status: 'success',
                }));
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
                dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfully recieved branch name',
                  position: 'bl',
                  status: 'success',
                }));
                
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
              dispatch(addNotification({
                title: 'Success',
                message: 'Successfully saved bankinfo',
                position: 'bl',
                status: 'success',
              }));
            }
         );
  }
}
