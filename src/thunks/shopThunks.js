import { request, getConfig } from './helpers';

import {
  shopActions,
  categoryActions,
  imageUploaderActions,
} from '../actions/';

export const getShopCategories = shop  => dispatch => {

  request(`/shops/${shop}/categories/`, getConfig()
            ).then(
              res => {
                dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

                if(res.length > 0) {
                  dispatch(categoryActions.categories.done.get.shopCategory(res));
                }
              }
            );
}

export const getShopAddress = shop  => dispatch => {

  request(`/shops/${shop}/address/`, getConfig()

            ).then(
              res => {
                dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

                if(res.length > 0) {
                  dispatch(shopActions.shop.set.address(res));
                }
              }
            );
}


export const getShop = shop  => dispatch => {

  request(`/shops/${shop}/`, getConfig()
          ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              if(res.id) {
                dispatch(shopActions.shop.set.shop(res))
              }
            }
          );
}


export const postShopPageProfie = (image, shop, token, formData)  => dispatch => {

  image.toBlob( blob => {

    formData.append('prof_pic', blob );

    request(`/vendors/shops/${shop}/`, getConfig(
          token,
          formData,
          'put'
        )).then(
          res => {
            dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              if(res.id) {

                dispatch(imageUploaderActions.imageUploader.hide());

                dispatch(getShop(shop));
              }
          }
        );

  });
}

export const postShopPageCover = (image, shop, token, formData)  => dispatch => {

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
              dispatch(imageUploaderActions.imageUploader.hide());

              dispatch(getShop(shop));
            }
          }
        );

  });
}
