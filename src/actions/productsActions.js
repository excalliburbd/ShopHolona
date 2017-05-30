import fetch from 'isomorphic-fetch';

import { getShopCategories } from './shopActions';

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
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

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
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

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
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

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
    payload: { shop },
  })

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/shops/${shop}/products/`, {
            mode: 'cors',
            headers: {
              "Accept": "application/json",
              'Content-type': 'application/json; charset=utf-8',
            },
          }).then(
            res => (res.status === 200) && res.json()
          ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

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
            headers: {
              "Accept": "application/json",
              'Content-type': 'application/json; charset=utf-8',
              'Authorization': `JWT ${token}`
            },
          }).then(
            res => res.json()
          ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              dispatch({
                type: 'DONE_API_ADD_PRODUCT',
                payload: res,
              });

              dispatch(getAllProducts(shop));
              dispatch(getShopCategories(shop));
            }
          );
}


export const deleteProduct = (id, shop, token) => dispatch => {

  dispatch({
    type: 'START_API_DELETE_PRODUCT',
    payload: {id, shop, token},
  });

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/vendors/shops/${shop}/products/${id}/`, {
            method: 'delete',
            headers: {
              'Authorization': `JWT ${token}`
            },
          }).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res})

              if( res.status === 200 || res.status === 204) {
                dispatch({
                  type: 'DONE_API_DELETE_PRODUCT',
                  payload: { response: res, id },
                });

                dispatch({
                  type: 'UPDATE_SHOP_CHIP',
                  payload: 0
                });

                dispatch(getShopCategories(shop));

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
            mode: 'cors',
            headers: {
              'Authorization': `JWT ${token}`,
            },
          }).then(
            res => res.json()
          ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              if(res.id){
                dispatch({
                  type: 'DONE_API_PRODUCT_IMGAE_POST',
                  payload: { response: res, id, key }
                });

                dispatch({
                  type: 'INC_PRODUCTS_UPLOAD_COUNT'
                })

                if (status === 'CROPED') {
                  dispatch({
                    type: 'HIDE_IMAGE_UPLOADER',
                  });
                }
              }else{
                console.log(res)

                dispatch({
                  type: 'ERROR_API_PRODUCT_IMGAE_POST',
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
    payload: {
        token,
        name,
        value,
        id,
        primary,
        primaryID,
        signal,
        customPrimary,
        customSecondary
    }
  })

  if (signal !== 'DONE_ALL') {
        fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/vendors/category/attributes/`, {
              method: 'post',
              mode: 'cors',
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
                dispatch({type: 'RESPONSE_API_DEBUG',payload:obj});

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

export const getFeaturedProduct = shop => dispatch => {

  dispatch({
    type: 'START_API_GET_FEATURED_PRODUCT',
    payload: { shop }
  });

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/shops/${shop}/featured-products/`, {
            method: 'get',
          }).then(
            res => res.json()
          ).then(
            res => {
              dispatch({
                type: 'DONE_API_GET_FEATURED_PRODUCT',
                payload: res,
              })
            }
          )
}

export const makeFeaturedProduct = (id, shop, token) => dispatch => {

  dispatch({
    type: 'START_API_MAKE_FEATURED_PRODUCT',
    payload: {id, shop, token}
  });

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/vendors/shops/${shop}/featured-products/`, {
            method: 'post',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json; charset=utf-8',
              'Authorization': `JWT ${token}`
            },
            body: JSON.stringify({
                product: `${id}`,
              })
          }).then(
            res => res.json()
          ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              dispatch({
                type: 'DONE_API_MAKE_FEATURED_PRODUCT',
                payload: res,
              });

              dispatch(getFeaturedProduct(shop));

              dispatch({
                type: 'HIDE_SIDEBAR'
              });
            }
          )
}

export const removeFromFeaturedProduct = (productID, featuredID, shop, token) => dispatch => {

  dispatch({
    type: 'START_API_REMOVE_FEATURED_PRODUCT',
    payload: {productID, featuredID, shop, token}
  });

  fetch(`http://ec2-52-66-156-152.ap-south-1.compute.amazonaws.com/api/vendors/shops/${shop}/featured-products/${featuredID}/`, {
            method: 'delete',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json; charset=utf-8',
              'Authorization': `JWT ${token}`
            }
          }).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              if (res.status === 204) {
                dispatch({
                  type: 'DONE_API_REMOVE_FEATURED_PRODUCT',
                  payload: { res, productID },
                });

                dispatch({
                  type: 'HIDE_SIDEBAR'
                });
              }
            }
          )
}
