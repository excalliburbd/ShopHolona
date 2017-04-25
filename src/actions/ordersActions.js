import fetch from 'isomorphic-fetch';

export const getOrderList = ({ shopId, token }) => dispatch => {

  fetch('http://192.168.1.21:8000/api/users/login/', {
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
