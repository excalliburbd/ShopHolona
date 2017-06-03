import { request, getConfig } from './helpers';

import { getShopCategories } from './shopActions';

export const getCategory = () => dispatch => {
  request('/api/references/categories/', getConfig() ).then(
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
  request(`/api/references/categories/${id}/`, getConfig() ).then(
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
  request(`/api/references/categories/${id}/${subID}/`, getConfig() ).then(
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

  request(`/api/shops/${shop}/products/`, getConfig() ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              dispatch({
                type: 'DONE_API_GET_PRODUCT',
              })

              dispatch({
                type: 'SET_API_PRODUCTS_ENTITIES',
                payload: res,
              })
            }
          );
}

export const saveProduct = (obj, shop, token) => dispatch => {
  request(`/api/vendors/shops/${shop}/products/`, getConfig(
            token,
            obj,
            'post'
          )).then(
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

  request(`/api/vendors/shops/${shop}/products/${id}/`, getConfig(
              token,
              null,
              'delete'
            )).then(
              res => {
                dispatch({type: 'RESPONSE_API_DEBUG',payload:res})

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
          );
}

export const postImage = (token, shop, obj, id, key, status)  => dispatch => {

  dispatch({
    type: 'POST_API_PRODUCT_IMGAE',
  })

  const apiRequest = new FormData();

  apiRequest.append('image', obj.file);
  apiRequest.append('alt_tag', obj.tag);

  request(`/api/vendors/shops/${shop}/images/`, getConfig(
            token,
            apiRequest,
            'post'
          )).then(
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
        request(`/api/vendors/category/attributes/`, getConfig(
              token,
              {
                name: name,
                value: value,
              },
              'post'
            )).then(
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

  request(`/api/shops/${shop}/featured-products/`, getConfig()
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

  request(`/api/vendors/shops/${shop}/featured-products/`, getConfig(
            token,
            {
              product: `${id}`,
            },
            'post'
          )).then(
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

  request(`/api/vendors/shops/${shop}/featured-products/${featuredID}/`, getConfig(
            token,
            null,
            'delete'
          )).then(
            res => {
              dispatch({
                type: 'DONE_API_REMOVE_FEATURED_PRODUCT',
                payload: { productID },
              });

              dispatch({
                type: 'HIDE_SIDEBAR'
              });
            }
          )
}
