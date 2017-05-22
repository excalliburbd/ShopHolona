import fetch from 'isomorphic-fetch';

export const getCategory = () => dispatch => {
  fetch('http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/references/categories/', {
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
  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/references/categories/${id}/`, {
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
  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/references/categories/${id}/${subID}/`, {
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


export const getAllProducts = shop  => dispatch => {

  dispatch({
    type: 'START_API_GET_PRODUCT',
  })

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/shops/${shop}/products/`, {
            mode: 'cors',
            headers: {
              "Accept": "application/json",
              'Content-type': 'application/json; charset=utf-8',
            },
          }).then(
            res => res.json()
          ).then(
            res => {
              dispatch({
                type: 'DONE_API_GET_PRODUCT',
              })

              dispatch({
                type: 'SET_PRODUCTS_ENTITIES',
                payload: res,
              })
            }
          );
}

export const saveProduct = (obj, shop, token) => dispatch => {
  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/vendors/shops/${shop}/products/`, {
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
              });

              dispatch(getAllProducts(shop));
            }
          );
}


export const deleteProduct = (id, shop, token) => dispatch => {

  dispatch({
    type: 'START_API_DELETE_PRODUCT',
    payload: id,
  });

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/vendors/shops/${shop}/products/${id}/`, {
            method: 'delete',
            headers: {
              'Authorization': `JWT ${token}`
            },
          }).then(
            res => {
              if( res.status === 200 || res.status === 204) {
                dispatch({
                  type: 'DONE_API_DELETE_PRODUCT',
                  payload: { response: res, id },
                });

                dispatch({
                  type: 'HIDE_SIDEBAR'
                })
              }
            }
          );
}

export const postImage = (token, shop, obj, id, key, status)  => dispatch => {

  dispatch({
    type: 'POST_API_PRODUCT_IMGAE',
  })

  const request = new FormData();

  request.append('image', obj.file);
  request.append('alt_tag', obj.tag);

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/vendors/shops/${shop}/images/`, {
            method: 'post',
            body: request,
            headers: {
              'Authorization': `JWT ${token}`,
            },
          }).then(
            res => res.json()
          ).then(
            res => {
              if(res.id){
                dispatch({
                  type: 'POST_API_PRODUCT_IMGAE_DONE',
                  payload: { response: res, id, key }
                })
              }else{
                console.log(res)

                dispatch({
                  type: 'POST_API_PRODUCT_IMGAE_ERROR',
                  payload: { response: res, id, key }
                })
              }

              if(status === 'DONE') {
                dispatch({
                  type: 'INVALIDATE_PRODUCT_IMGAES',
                  payload: { id, key }
                })
              }
            }
          );
}

export const  requestAttribute = (
  token,
  name,
  value,
  id,
  primary,
  primaryID,
  signal,
  customPrimary,
  customSecondary
)  => dispatch => {

  dispatch({
    type: 'START_SET_CUSTOM_ATTRIBUT',
    payload: signal
  })

  if (signal !== 'DONE_ALL') {
        fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/vendors/category/attributes/`, {
              method: 'post',
              body: JSON.stringify({
                name: name,
                value: value,
              }),
              headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': `JWT ${token}`,
              },
            }).then(
              res => res.json()
            ).then(
              obj => {
                if (obj.id) {
                  if (primary) {
                    dispatch({
                      type: 'SET_CUSTOM_ATTRIBUT_ID_PRIMAY',
                      payload: { newID: obj.id, oldID: id },
                    })
                  } else {
                    dispatch({
                      type: 'SET_CUSTOM_ATTRIBUT_ID_SECONDARY',
                      payload: { newID: obj.id, oldID: id, primaryID },
                    })
                  }
                } else {
                  dispatch({
                    type: 'ERROR_SET_CUSTOM_ATTRIBUTE',
                    payload: obj,
                  })
                }

                if (signal === 'DONE_PRIMARY') {
                  dispatch({
                    type: 'DONE_SET_CUSTOM_ATTRIBUTE_PRIMARY'
                  })
                }

                if (signal === 'DONE_SECONDARY') {
                  dispatch({
                    type: 'DONE_SET_CUSTOM_ATTRIBUTE_SECONDARY'
                  })
                }
              }
            );
  } else {
      if (!customPrimary) {
        dispatch({
          type: 'DONE_SET_CUSTOM_ATTRIBUTE_PRIMARY'
        })
      }

      if (!customSecondary) {
        dispatch({
          type: 'DONE_SET_CUSTOM_ATTRIBUTE_SECONDARY'
        })
      }
  }
}
