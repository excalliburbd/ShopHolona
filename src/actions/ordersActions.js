import fetch from 'isomorphic-fetch';

export const getOrderList = ({ shopId, token }) => dispatch => {

  fetch('http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/users/login/', {
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
