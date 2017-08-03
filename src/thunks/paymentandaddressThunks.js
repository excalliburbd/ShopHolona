import { request, getConfig } from './helpers';

import { paymentandaddressActions } from '../actions';
import { addNotification } from 'reapop';

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

export const saveBankInfo = (bank, branch, accountName, accountNumber, shop, token) => (dispatch, getState) => {
  if (token) {
    const payments = getState().shop.payments[0];
    if (payments.id) {
      request(`/vendors/shops/${shop}/payments/${payments.id}`, getConfig(
                token,
                null,
                'DELETE'
              )).then(
                res => {
                  request(`/vendors/shops/${shop}/payments/`, getConfig(
                      token,
                      {
                        bank: branch,
                        account_name: accountName,
                        account_number: accountNumber,
                        account_type: '1'
                      },
                      'POST'
                    )).then(
                      response => {
                        dispatch(addNotification({
                          title: 'Success',
                          message: 'Successfully saved bank information',
                          position: 'bl',
                          status: 'success',
                        }));
                      }
                  ).catch(
                      err => {
                        dispatch(addNotification({
                          title: 'Error Saving Bank Information',
                          message: err,
                          position: 'bl',
                          status: 'error',
                        }));
                      }
                  );
                }
              )
    } else {
      request(`/vendors/shops/${shop}/payments/`, getConfig(
            token,
            {
              bank: branch,
              account_name: accountName,
              account_number: accountNumber,
              account_type: '1'
            },
            'POST'
          )).then(
            response => {
              console.log(response)
              dispatch(addNotification({
                title: 'Success',
                message: 'Successfully saved bank information',
                position: 'bl',
                status: 'success',
              }));
            }
         ).catch(
            err => {
              console.log(err);
              dispatch(addNotification({
                title: 'Error Saving Bank Information',
                message: err,
                position: 'bl',
                status: 'error',
              }));
            }
         );
    }
  }
}
