import { request, getConfig } from './helpers';

export const getShopCategories = shop  => dispatch => {

  dispatch({
    type: 'START_API_GET_SHOP_CATEGORY',
    payload: {shop}
  })

  request(`/api/shops/${shop}/categories/`, getConfig()
            ).then(
              res => {
                dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

                dispatch({
                  type: 'DONE_API_GET_SHOP_CATEGORY',
                })

                if(res.length > 0) {
                  dispatch({
                    type: 'SET_API_SHOP_CATEGORY',
                    payload: res,
                  })
                }
              }
            );
}

export const getShopAddress = shop  => dispatch => {

  dispatch({
    type: 'START_API_GET_SHOP_ADDRESS',
    payload: {shop}
  })

  request(`/api/shops/${shop}/address/`, getConfig()

            ).then(
              res => {
                dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

                dispatch({
                  type: 'DONE_API_GET_SHOP_ADDRESS',
                })

                if(res.length > 0) {
                  dispatch({
                    type: 'SET_SHOP_ADDRESS',
                    payload: res,
                  })
                }
              }
            );
}


export const getShop = shop  => dispatch => {

  dispatch({
    type: 'START_API_GET_SHOP',
    payload: {shop}
  })

  request(`/api/shops/${shop}/`, getConfig()
          ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              dispatch({
                type: 'DONE_API_GET_SHOP',
              })

              if(res.id) {
                dispatch({
                  type: 'SET_SHOP',
                  payload: res,
                })
              }
            }
          );
}


export const postShopPageProfie = (image, shop, token, formData)  => dispatch => {

  dispatch({
    type: 'PUT_API_SHOP_PROFILE',
  });

  image.toBlob( blob => {

    formData.append('prof_pic', blob );

    request(`/api/vendors/shops/${shop}/`, getConfig(
          token,
          formData,
          'put'
        )).then(
          res => {
            dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

            if(res.id) {
              dispatch({
                type: 'DONE_API_SHOP_PROFILE_PUT',
                payload: res,
              });

              dispatch({
                type: 'HIDE_IMAGE_UPLOADER',
              });

              dispatch(getShop(shop));
            }
          }
        );

  });
}

export const postShopPageCover = (image, shop, token, formData)  => dispatch => {

  dispatch({
    type: 'PUT_API_SHOP_COVER',
  });

  image.toBlob( blob => {

    formData.append('cover_photo', blob );

    request(`/api/vendors/shops/${shop}/`, getConfig(
          token,
          formData,
          'put'
        )).then(
          res => {
            dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

            if(res.id) {
              dispatch({
                type: 'DONE_API_SHOP_COVER_PUT',
                payload: res,
              });

              dispatch({
                type: 'HIDE_IMAGE_UPLOADER',
              });

              dispatch(getShop(shop));
            }
          }
        );

  });
}
