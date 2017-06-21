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

            if(res.id) {
              dispatch(imageUploaderActions.imageUploader.hide());

              dispatch(getShop(shop));
            }
          }
        );

  });
}

export const getShopHours = (shop, token) => dispatch => {

  request(`/vendors/shops/${shop}/hours/`, getConfig(
              token
            )).then(
              res => {

                if(res.length > 0) {
                  const hoursObj = res.find(
                    hours => (hours.weekday === 1)
                  );

                  if (hoursObj) {
                    dispatch(shopActions.shop.set.hours(hoursObj));
                  } else {
                    request(`/vendors/shops/${shop}/hours/`, getConfig(
                              token,
                              {
                                weekday: 1,
                                from_hour: '09:00',
                                to_hour: '21:00',
                              },
                              'post'
                            )).then(
                              res => dispatch(shopActions.shop.set.hours(res))
                            )
                  }
                }
              }
            );
}

export const runShopInfoUpdate = (info, shop, token) => dispatch => {
  const {
    name,
    fcom,
    editing,
    phone,
    hours,
  } = info;

  const edited = editing.reduce(
    (arr, infoKey) => {
      let returnArr = arr;

      switch(infoKey) {
        case 'name':
          request(`/vendors/shops/${shop}/`, getConfig(
                    token,
                    {
                      shop_name: name,
                      fcom,
                    },
                    'patch'
                  )).then(
                    res => {
                      if (res.id) {
                        //do something
                      }
                    }
                  ).catch(
                    err => {
                      returnArr = [ ...arr, infoKey ];
                    }
                  );
          return returnArr;
        case 'phone':
          request(`/vendors/shops/${shop}/contacts/${phone.id}/`, getConfig(
                    token,
                    {
                      type: 0,
                      description: phone.number
                    },
                    'put'
                  )).then(
                    res => {
                      if (res.type === 0) {
                        dispatch(shopActions.shop.set.contactNumber({
                          id: phone.id,
                          value: res.description,
                        }))
                      }
                    }
                  ).catch(
                    err => {
                      console.log(err)
                      returnArr = [ ...arr, infoKey ];
                    }
                  );
          return returnArr;
        case 'from_hour':
          console.log(hours,`/vendors/shops/${shop}/hours/${hours.id}`)
          request(`/vendors/shops/${shop}/hours/${hours.id}`, getConfig(
                    token,
                    {
                      from_hour: hours.from_hour
                    },
                    'patch'
                  )).then(
                    res => {
                      console.log(res)
                      if (res.from_hour) {
                        dispatch(shopActions.shop.set.hours({
                          from_hour: res.from_hour,
                          to_hour: hours.to_hour,
                        }))
                      }
                    }
                  ).catch(
                    err => {
                      console.log(err)
                      returnArr = [ ...arr, infoKey ];
                    }
                  );
          return returnArr;
        default:
          return [ ...arr, infoKey ]
      }
    }, []
  );

  dispatch(shopActions.shop.set.editing(edited));
}
