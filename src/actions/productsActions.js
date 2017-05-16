import fetch from 'isomorphic-fetch';

export const getCategory = () => dispatch => {
  fetch('http://shophobe-development.herokuapp.com/api/references/categories/', {
            method: 'get',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json; charset=utf-8'
            },
          }).then(
            res => res.json()
          ).then(
            res => {
              dispatch({
                type: 'SET_CATEGORIES',
                payload: res,
              })
            }
          );
}

export const getSubCategory = id => dispatch => {
  fetch(`http://shophobe-development.herokuapp.com/api/references/categories/${id}/`, {
            method: 'get',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json; charset=utf-8'
            },
          }).then(
            res => res.json()
          ).then(
            res => {
              dispatch({
                type: 'SET_SUB_CATEGORIES',
                payload: res,
              })
            }
          );
}

export const getSubSubCategory = (id, subID )=> dispatch => {
  fetch(`http://shophobe-development.herokuapp.com/api/references/categories/${id}/${subID}/`, {
            method: 'get',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json; charset=utf-8'
            },
          }).then(
            res => res.json()
          ).then(
            res => {
              dispatch({
                type: 'SET_SUB_SUB_CATEGORIES',
                payload: res,
              })
            }
          );
}

export const saveProduct = (obj, shop, token) => dispatch => {
  fetch(`http://shophobe-development.herokuapp.com/api/vendors/shops/${shop}/products/`, {
            method: 'post',
            body: JSON.stringify(obj),
            mode: 'cors',
            headers: {
              "Accept": "application/json",
              'Content-type': 'application/json; charset=utf-8',
              'Authorization': `JWT ${token}`
            },
          }).then(
            res => res.json()
          ).then(
            res => {
              dispatch({
                type: 'DONE_API_ADD_PRODUCT',
                payload: res,
              })
            }
          );
}
