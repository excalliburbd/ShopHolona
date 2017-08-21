import { addNotification } from 'reapop';

import { request, getConfig, fromState } from './helpers';

import {
  shopActions,
  categoryActions,
  imageUploaderActions,
} from '../actions/';

import {
  getBranch,
} from '../thunks/paymentandaddressThunks';

export const getShopCategories = shop  => dispatch => {
  request(`/shops/${shop}/categories/`, getConfig()
            ).then(
              res => {
                if(res.length > 0) {
                  dispatch(categoryActions.categories.done.get.shopCategory(res));
                }
              }
            ).catch(
              err => {
                console.log(err);
                dispatch(addNotification({
                  title: 'Something went wrong!',
                  message: 'Sorry for your inconvenicence. We are looking into it.',
                  position: 'bl',
                  status: 'error',
                }));
              }
            );
}

export const getShopAddress = shop  => dispatch => {
  request(`/shops/${shop}/address/`, getConfig(

          )).then(
              res => {
                if(res.length > 0) {
                  dispatch(shopActions.shop.set.address(res));
                }
              }
            );
}


export const getShop = shop  => dispatch => {
  request(`/shops/${shop}/`, getConfig(
          )).then(
            res => {
              if(res.id) {
                dispatch(shopActions.shop.set.shop(res));
              }
            }
          );
}


export const postShopPageProfie = (image, shop, token, formData, predicate, action, step, file)  => (dispatch, getState) => {
  const {
    demostore,
  } = fromState(getState);

  if (demostore) {
    dispatch(shopActions.shop.set.demo.profPic(file.preview));
    dispatch(imageUploaderActions.imageUploader.hide());
    dispatch(addNotification({
        title: 'Success',
        message: 'Successfully updated shop profile',
        position: 'bl',
        status: 'success',
    }));
    predicate && action(step);
  } else {
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
                    message: 'Successfully updated shop profile',
                    position: 'bl',
                    status: 'success',
                }));
                predicate && action(step);
              }
            }
          );
      }
    });
  }
}

export const postShopPageCover = (image, shop, token, formData, predicate, action, step, file)  => (dispatch, getState) => {
  const {
    demostore,
  } = fromState(getState);

  if (demostore) {
    dispatch(shopActions.shop.set.demo.cover(file.preview));
    dispatch(imageUploaderActions.imageUploader.hide());
    dispatch(addNotification({
        title: 'Success',
        message: 'Successfully updated shop cover',
        position: 'bl',
        status: 'success',
      }));
    predicate && action(step);
  } else {
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
                    message: 'Successfully updated shop cover',
                    position: 'bl',
                    status: 'success',
                  }));
                predicate && action(step);
              }
            }
          );
      }

    });
  }
}

export const postShopTINImage = (image, shop, token, formData, file)  => (dispatch, getState) => {
  const {
    demostore,
  } = fromState(getState);

  if (demostore) {
    dispatch(shopActions.shop.set.demo.tin(file.preview));
    dispatch(imageUploaderActions.imageUploader.hide());
    dispatch(addNotification({
        title: 'Success',
        message: 'Successfully updated licence image',
        position: 'bl',
        status: 'success',
      }));
  } else {
    image.toBlob( blob => {
      formData.append('trade_license_image', blob );
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
                    message: 'Successfully updated licence image',
                    position: 'bl',
                    status: 'success',
                  }));
              }
            }
          );
      }

    });
  }
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

export const getShopPayments = (shop, token) => (dispatch, getState) => {
  request(`/vendors/shops/${shop}/payments/`, getConfig(
                      token
                    )).then(
                      res => {
                        if (res.length > 0) {
                          dispatch(shopActions.shop.set.payments(res));
                          const {
                            bankName,
                          } = fromState(getState);
                          dispatch(shopActions.shop.set.payments([{ ...res[0], bank: { ...res[0].bank, bankName }}]));
                          res[0].bank.id && getBranch(res[0].bank.id);
                        }
                      }
                    )
}

export const runShopInfoUpdate = (info, shop, token) => (dispatch, getState) => {
  const {
    demostore,
    updatedAddress,
  } = fromState(getState);

  const {
    name,
    fcom,
    services,
    physical_store,
    editing,
    phone,
    hours,
    description,
    license,
    social,
  } = info;

  if (token) {
    const edited = editing.reduce(
      (arr, infoKey) => {
        let returnArr = arr;

        switch(infoKey) {
          case 'name':
            if (demostore) {
              dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfully updated shop name',
                            position: 'bl',
                            status: 'success',
                          }));
            } else {
               request(`/vendors/shops/${shop}/`, getConfig(
                      token,
                      {
                        shop_name: name,
                        fcom,
                        services,
                        physical_store,
                      },
                      'PATCH'
                    )).then(
                      res => {
                        if (res.id) {
                          dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfully updated shop name',
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
                            title: 'Error during shop information update',
                            message: info.shop_name[0],
                            position: 'bl',
                            status: 'error',
                          }));
                        }
                      }
                    );

            }
            return returnArr;
          case 'phone':
            if (demostore) {
                dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfully updated phone number',
                            position: 'bl',
                            status: 'success',
                          }));
            } else {
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
                            message: 'Successfully updated phone number',
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
                          title: 'Error during shop information update',
                          message: err,
                          position: 'bl',
                          status: 'error',
                        }));
                      }
                    );
            }
            return returnArr;
          case 'from_hour':
            if (demostore) {
                  dispatch(addNotification({
                              title: 'Success',
                              message: 'Successfully updated hour',
                              position: 'bl',
                              status: 'success',
                            }));
              } else {
                request(`/vendors/shops/${shop}/hours/${hours.id}/`, getConfig(
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
                              message: 'Successfully updated hour',
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
                            title: 'Error during hour update',
                            message: err,
                            position: 'bl',
                            status: 'error',
                          }));
                        }
                      );
              }
            return returnArr;
          case 'to_hour':
            if (demostore) {
                    dispatch(addNotification({
                              title: 'Success',
                              message: 'successfully updated to_hour',
                              position: 'bl',
                              status: 'success',
                            }));
            } else {
              request(`/vendors/shops/${shop}/hours/${hours.id}/`, getConfig(
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
                              message: 'successfully updated to_hour',
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
                            message: err,
                            position: 'bl',
                            status: 'error',
                          }));
                        }
                      );
            }
            return returnArr;
          case 'description':
            if (demostore) {
              dispatch(addNotification({
                              title: 'Successfully updated shop description',
                              message: 'Store: Your Store Description has been updated',
                              position: 'bl',
                              status: 'success',
                            }));
            } else {
              request(`/vendors/shops/${shop}/`, getConfig(
                        token,
                        {
                          short_descr: description,
                          fcom,
                          services,
                          physical_store,
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
            }
            return returnArr;
          case 'license':
            if (demostore) {
              dispatch(addNotification({
                              title: 'Successfully updated shop description',
                              message: 'Store: Your Store Description has been updated',
                              position: 'bl',
                              status: 'success',
                            }));
            } else {
              request(`/vendors/shops/${shop}/`, getConfig(
                        token,
                        {
                          trade_license_number: license.number,
                          fcom,
                          services,
                          physical_store,
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
            }
            return returnArr;
          case 'address':
            if (demostore) {
              dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfully updated shop address',
                            position: 'bl',
                            status: 'success',
                          }));
            } else {
              const {
                id : addressID,
                ...addressObj,
              } = updatedAddress;

              request(`/vendors/shops/${shop}/address/${addressID}/`, getConfig(
                      token,
                      addressObj,
                      'PATCH'
                    )).then(
                      res => {
                        if (res.city || res.district) {
                          dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfully updated shop address',
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
                            title: 'Error during shop informationupdate',
                            message: info.shop_name[0],
                            position: 'bl',
                            status: 'error',
                          }));
                        }
                      }
                    );

            }
            return returnArr;
          case 'social':
            if (demostore) {
              dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfully updated social links',
                            position: 'bl',
                            status: 'success',
                          }));
            } else {
              request(`/vendors/shops/${shop}/`, getConfig(
                token,
                {
                  fcom,
                  services,
                  physical_store,
                  fb_link: social.fb_link,
                  twitter_link: social.twitter_link,
                  google_plus: social.google_plus,
                  instagram: social.instagram,
                  linkedin: social.linkedin,
                },
                'PATCH'
              )).then(
                res => {
                  if (res.id) {
                    dispatch(addNotification({
                      title: 'Success',
                      message: 'Successfully updated social links',
                      position: 'bl',
                      status: 'success',
                    }));
                    dispatch(getShop(shop));
                  }
                }
              ).catch(
                err => {
                  returnArr = [ ...arr, infoKey ];

                  const info = JSON.parse(err);

                  if (info.shop_name) {
                    dispatch(addNotification({
                      title: 'Error during shop information update',
                      message: info.shop_name[0],
                      position: 'bl',
                      status: 'error',
                    }));
                  }
                }
              );
            }
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
