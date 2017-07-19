import { addNotification } from 'reapop';

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
                    dispatch(addNotification({
                    title: 'Success',
                    message: 'Successfull updated product name',
                    position: 'bl',
                    status: 'success',
                  }));
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
                  dispatch(addNotification({
                    title: 'Success',
                    message: 'Successfull updated product name',
                    position: 'bl',
                    status: 'success',
                  }));
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
                dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfull updated product name',
                  position: 'bl',
                  status: 'success',
                }));
              }
            }
          );
}


export const postShopPageProfie = (image, shop, token, formData)  => dispatch => {

  image.toBlob( blob => {

    formData.append('prof_pic', blob );

    if (token) {
      request(`/vendors/shops/${shop}/`, getConfig(
          token,
          formData,
          'PUT'
        )).then(
          res => {

            if(res.id) {

              dispatch(imageUploaderActions.imageUploader.hide());

              dispatch(getShop(shop));
              dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfull updated product name',
                  position: 'bl',
                  status: 'success',
              }));
            }
          }
        );
    }

  });
}

export const postShopPageCover = (image, shop, token, formData)  => dispatch => {

  image.toBlob( blob => {

    formData.append('cover_photo', blob );

    if (token) {
      request(`/vendors/shops/${shop}/`, getConfig(
          token,
          formData,
          'PUT'
        )).then(
          res => {

            if(res.id) {
              dispatch(imageUploaderActions.imageUploader.hide());

              dispatch(getShop(shop));
              dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfull updated product name',
                  position: 'bl',
                  status: 'success',
                }));
            }
          }
        );
    }

  });
}

export const getShopHours = (shop, token) => dispatch => {

  if (token) {
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
}

export const runShopInfoUpdate = (info, shop, token) => dispatch => {
  const {
    name,
    fcom,
    editing,
    phone,
    hours,
    description,
  } = info;

  if (token) {
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
                      'PATCH'
                    )).then(
                      res => {
                        if (res.id) {
                          dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfull updated shop name',
                            position: 'bl',
                            status: 'success',
                          }));
                        }
                      }
                    ).catch(
                      err => {
                        returnArr = [ ...arr, infoKey ];

                        const info = JSON.parse(err);

                        if (info.shop_name) {
                          dispatch(addNotification({
                            title: 'Error during shop update',
                            message: info.shop_name[0],
                            position: 'bl',
                            status: 'error',
                          }));
                        }
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
                      'PUT'
                    )).then(
                      res => {
                        if (res.type === 0) {
                          dispatch(shopActions.shop.set.contactNumber({
                            id: phone.id,
                            value: res.description,
                          }))
                          dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfull updated product name',
                            position: 'bl',
                            status: 'success',
                          }));
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
            request(`/vendors/shops/${shop}/hours/${hours.id}`, getConfig(
                      token,
                      {
                        from_hour: `${hours.from_hour.getHours()}:${hours.from_hour.getMinutes()}`
                      },
                      'PATCH'
                    )).then(
                      res => {
                        if (res.from_hour) {
                          dispatch(shopActions.shop.set.fromHour({
                            from_hour: res.from_hour,
                          }))
                          dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfull updated product name',
                            position: 'bl',
                            status: 'success',
                          }));
                        }
                      }
                    ).catch(
                      err => {
                        console.log(err)
                        returnArr = [ ...arr, infoKey ];
                        dispatch(addNotification({
                          title: 'Error during shop update',
                          message: info.shop_name[0],
                          position: 'bl',
                          status: 'error',
                        }));
                      }
                    );
            return returnArr;
          case 'to_hour':
            request(`/vendors/shops/${shop}/hours/${hours.id}`, getConfig(
                      token,
                      {
                        to_hour: `${hours.to_hour.getHours()}:${hours.to_hour.getMinutes()}`
                      },
                      'PATCH'
                    )).then(
                      res => {
                        if (res.to_hour) {
                          dispatch(shopActions.shop.set.toHours({
                            to_hour: res.to_hour,
                          }))
                          dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfull updated product name',
                            position: 'bl',
                            status: 'success',
                          }));
                        }
                      }
                    ).catch(
                      err => {
                        console.log(err)
                        returnArr = [ ...arr, infoKey ];
                        dispatch(addNotification({
                          title: 'Error during shop update',
                          message: info.shop_name[0],
                          position: 'bl',
                          status: 'error',
                        }));
                      }
                    );
            return returnArr;
          case 'description':
            request(`/vendors/shops/${shop}/`, getConfig(
                      token,
                      {
                        short_descr: description,
                        fcom,
                      },
                      'PATCH'
                    )).then(
                      res => {
                        if (res.id) {
                          //do something
                          dispatch(shopActions.shop.set.editDesc(false));
                          dispatch(getShop(shop));
                          dispatch(addNotification({
                            title: 'Successfully updated shop description',
                            message: 'Store: Your Store Description has been updated',
                            position: 'bl',
                            status: 'success',
                          }));
                        }
                      }
                    ).catch(
                      err => {
                        returnArr = [ ...arr, infoKey ];
                        dispatch(addNotification({
                            title: 'Error updating shop description',
                            message: err,
                            position: 'bl',
                            status: 'error',
                        }));
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
  dispatch(getShop(shop));
}
