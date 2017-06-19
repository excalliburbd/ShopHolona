import { request, getConfig } from './helpers';

export const getOrderList = ({ shopId, token }) => dispatch => {

  request('/users/login/', getConfig(
            token,
            null,
          )).then(
          );
}
