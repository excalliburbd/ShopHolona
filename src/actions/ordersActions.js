import { request, getConfig } from './helpers';

export const getOrderList = ({ shopId, token }) => dispatch => {

  request('/api/users/login/', getConfig(
            token,
            null,
          )).then(
            res => res.json()
          ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});
            }
          );
}
