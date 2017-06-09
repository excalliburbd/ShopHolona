import { request, getConfig } from './helpers';

import {
  shopActions,
  categoryActions,
  imageUploaderActions,
} from '../actions/';

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
                  dispatch(categoryActions.categories.done.get.shopCategory(res));
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
                  dispatch(shopActions.shop.set.address(res));
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
                dispatch(shopActions.shop.set.shop(res))
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

              dispatch(imageUploaderActions.imageUploader.hide());

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

    request(`/vendors/shops/${shop}/`, getConfig(
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

              dispatch(imageUploaderActions.imageUploader.hide());

              dispatch(getShop(shop));
            }
          }
        );

  });
}
