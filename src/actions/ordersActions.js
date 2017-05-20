import fetch from 'isomorphic-fetch';

export const getOrderList = ({ shopId, token }) => dispatch => {

  fetch('/api/users/login/', {
            method: 'get',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json; charset=utf-8',
              'Authorization': 'Token ' + token
            },

          }).then(
            res => res.json()
          ).then(
            res => {
              console.log(res);
            }
          );
}
