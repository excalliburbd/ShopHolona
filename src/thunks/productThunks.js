import { request, getConfig } from './helpers';
import { addNotification } from 'reapop';

import { getShopCategories } from './shopThunks';

import {
  sidebarActions,
  shopActions,
  productActions,
  categoryActions,
  imageUploaderActions,
} from '../actions/';

export const getCategory = () => dispatch => {
  request('/references/categories/', getConfig() ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              dispatch(categoryActions.categories.done.get.category(res));
            }
          );
}

export const getSubCategory = id => dispatch => {
  request(`/references/categories/${id}/`, getConfig() ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              dispatch(categoryActions.categories.done.get.subCategory(res));
            }
          );
}

export const getSubSubCategory = (id, subID )=> dispatch => {
  request(`/references/categories/${id}/${subID}/`, getConfig() ).then(
            res => {
              dispatch(categoryActions.categories.done.get.subSubCategory(res));
            }
          );
}

export const getAllProducts = (shop, demostore, id, token) => dispatch => {

  request(`/shops/${shop}/products/`, getConfig() ).then(
            res => {
              dispatch(productActions.products.done.get.products(res));
              if (demostore) {
                request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
                          token,
                          null,
                          'DELETE'
                        ));
              }
            }
          );
}

export const saveProduct = (obj, shop, token, editing, demostore) => dispatch => {
  if (editing) {

    const {
      id,
      name,
      short_desc,
    } = obj;
    const price = Math.round(obj.price);
    const weight = Math.round(obj.weight);

    const editedAttributes = obj.variances.map(
                                      variant => variant.attributes
                                                        .filter( ({ edited }) => edited )
                                                        .map( attribute => ({...attribute, variantID: variant.id, attrID: attribute.id }))
                                    ).reduce( (acc, curr) => {
                                                        return ([...acc, ...curr])
                                              },[])

    const oldEditedAttr = editedAttributes.filter( ({ attrType }) => attrType === 'old');
    const newEditedAttr = editedAttributes.filter( ({ attrType }) => attrType === 'new');

    const editedImages = obj.variances.filter( ({ imgEdit }) => imgEdit )
                                      .map(
                                        variant => ({
                                          id: variant.id,
                                          images: variant.images.map(
                                            image => image.id
                                          ),
                                        })
                                      );

    const variances = obj.variances.map(
                        variant => ({
                          id: variant.id,
                          type: variant.type.id,
                          images: variant.images.map(
                            image => image.id
                          ),
                          attributes: variant.attributes.map(
                            attr => ({
                              id: attr.id,
                              type: attr.type.id,
                              description: attr.description,
                              weight: weight,
                              price: price,
                              stock: attr.stock,
                            })
                          )
                        })
                      );
    if (token) {
      const edited = obj.editing.reduce(
      (arr, infoKey) => {
        let returnArr = arr;

        switch(infoKey) {
          case 'name':
            if (demostore) {
              dispatch(productActions.products.ui.set.name({
                id,
                name
              }));
              dispatch(addNotification({
                title: 'Success',
                message: 'Successfull updated product name',
                position: 'bl',
                status: 'success',
              }));
            } else {
              request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
                        token,
                        {
                          name
                        },
                        'PATCH'
                      )).then(
                        res => {
                          if (res.id) {
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
                          returnArr = [ ...arr, infoKey ];

                          const info = JSON.parse(err);

                          if (info.name) {
                            dispatch(addNotification({
                              title: 'Error during product update',
                              message: info.name[0],
                              position: 'bl',
                              status: 'error',
                            }));
                          }
                        }
                      );
            }
            return returnArr;
          case 'desc':
            if (demostore) {
              dispatch(productActions.products.ui.set.desc({
                id,
                desc: short_desc
              }));
              dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfull updated product description',
                  position: 'bl',
                  status: 'success',
              }));
            } else {
              request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
                        token,
                        {
                          short_desc,
                        },
                        'PATCH'
                      )).then(
                        res => {
                          if (res.id) {
                            //do something
                            dispatch(addNotification({
                              title: 'Success',
                              message: 'Successfull updated product description',
                              position: 'bl',
                              status: 'success',
                            }));
                          }
                        }
                      ).catch(
                        err => {
                          returnArr = [ ...arr, infoKey ];

                          const info = JSON.parse(err);

                          if (info.short_desc) {
                            dispatch(addNotification({
                              title: 'Error during description update',
                              message: info.short_desc[0],
                              position: 'bl',
                              status: 'error',
                            }));
                          }
                        }
                      );
            }
            return returnArr;
          case 'old_stock':
            oldEditedAttr.forEach(
              attr => {
                if (demostore) {
                  dispatch(productActions.products.ui.set.attrbute({
                    id,
                    variantID: attr.variantID,
                    attrID: attr.attrID,
                    attr,
                  }));
                  dispatch(addNotification({
                    title: 'Success',
                    message: 'Successfully updated product stock',
                    position: 'bl',
                    status: 'success',
                  }));
                } else {
                  request(`/vendors/shops/${shop}/products/${id}/variances/${attr.variantID}/attributes/${attr.attrID}/`, getConfig(
                          token,
                          {
                            type: attr.type.id,
                            description: attr.description,
                            weight: attr.weight,
                            price: attr.price,
                            stock: attr.stock
                          },
                          'PATCH'
                        )).then(
                          res => {
                            dispatch(addNotification({
                              title: 'Success',
                              message: 'Successfully updated product stock',
                              position: 'bl',
                              status: 'success',
                            }));
                          }
                        ).catch(
                          err => {
                            returnArr = [ ...arr, infoKey ];

                            const info = JSON.parse(err);

                            console.log(info);
                            //TODO:

                            // if (info.??) {
                              dispatch(addNotification({
                                title: 'Error during product update',
                                message: 'Can not update stock',
                                position: 'bl',
                                status: 'error',
                              }));
                            // }
                          }
                      );
                }
              }
            )
            return returnArr;
          case 'new_stock':
            newEditedAttr.forEach(
              attr => {
                if (demostore) {
                  dispatch(productActions.products.ui.set.attrbute({
                    id,
                    variantID: attr.variantID,
                    attrID: attr.attrID,
                    attr,
                  }));
                  dispatch(addNotification({
                      title: 'Success',
                      message: 'Successfully updated product stock',
                      position: 'bl',
                      status: 'success',
                  }));
                } else {
                  request(`/vendors/shops/${shop}/products/${id}/variances/${attr.variantID}/attributes/`, getConfig(
                          token,
                          {
                            type: attr.type.id,
                            description: attr.description,
                            weight: attr.weight,
                            price: attr.price,
                            stock: attr.stock
                          },
                          'POST'
                        )).then(
                          res => {
                            dispatch(addNotification({
                                title: 'Success',
                                message: 'Successfully updated product stock',
                                position: 'bl',
                                status: 'success',
                            }));
                          }
                        ).catch(
                          err => {
                            returnArr = [ ...arr, infoKey ];

                            // const info = JSON.parse(err);
                            //TODO:

                            // if (info.short_desc) {
                              dispatch(addNotification({
                                title: 'Error during product update',
                                message: 'Can not update stock',
                                position: 'bl',
                                status: 'error',
                              }));
                            // }
                          }
                      );
                }
              }
            );
            return returnArr;
          case 'price_weight':
            variances.forEach(
              ({ id: variantID, ...variant }) => {
                variant.attributes.forEach(
                  ({ id: attrID, ...attr}) => {
                    if (attrID) {
                      if (demostore) {
                        dispatch(productActions.products.ui.set.attrbute({
                          id,
                          variantID: attr.variantID,
                          attrID: attr.attrID,
                          attr,
                        }));
                        dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfully updated product details',
                            position: 'bl',
                            status: 'success',
                        }));
                      } else {
                        request(`/vendors/shops/${shop}/products/${id}/variances/${variantID}/attributes/${attrID}/`, getConfig(
                                  token,
                                  {
                                    weight: attr.weight,
                                    price: attr.price,
                                  },
                                  'PATCH'
                                )).then(
                                  res => {
                                    dispatch(addNotification({
                                      title: 'Success',
                                      message: 'Successfully updated price weight',
                                      position: 'bl',
                                      status: 'success',
                                    }));
                                  }
                                ).catch(
                                  err => {
                                    returnArr = [ ...arr, infoKey ];

                                    // const info = JSON.parse(err);
                                    //TODO:

                                    // if (info.short_desc) {
                                      dispatch(addNotification({
                                        title: 'Error during upadating price weight',
                                        message: 'Can not update price weight',
                                        position: 'bl',
                                        status: 'error',
                                      }));
                                    // }
                                  }
                              );
                      }
                    }
                  }
                )
              }
            )

            return returnArr;
          case 'image':
            editedImages.forEach(
              variance => {
                const {
                  id : varianceID,
                  images,
                } = variance;

                request(`/vendors/shops/${shop}/products/${id}/variances/${varianceID}/`, getConfig(
                        token,
                        {
                          images
                        },
                        'PATCH'
                      )).then(
                        res => {
                          console.log(res)
                          dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfully updated product name',
                            position: 'bl',
                            status: 'success',
                          }));
                        }
                      ).catch(
                        err => {
                          console.log(err)
                           dispatch(addNotification({
                              title: 'Success',
                              message: 'Successfully updated product name',
                              position: 'bl',
                              status: 'success',
                          }));
                          returnArr = [ ...arr, infoKey ];
                        }
                    );
              }
            )
            return returnArr;
          default:
            return returnArr;
        }
      }, []);

      dispatch(productActions.products.ui.set.editing(edited));
    }
  } else {
    if (token) {
      request(`/vendors/shops/${shop}/products/`, getConfig(
            token,
            obj,
            'post'
          )).then(
            res => {
              if (demostore) {
                if (res.id) {
                  dispatch(getAllProducts(shop, demostore, res.id, token));
                  dispatch(getShopCategories(shop));
                  dispatch(addNotification({
                    title: 'Success',
                    message: 'Successfully uploaded product',
                    position: 'bl',
                    status: 'success',
                  }));
                }
              } else {
                dispatch(getAllProducts(shop, false, null, null));
                dispatch(getShopCategories(shop));
                dispatch(addNotification({
                  title: 'Success',
                  message: 'Successfully uploaded product',
                  position: 'bl',
                  status: 'success',
                }));
              }
            }
          ).catch(
            err => {
              dispatch(addNotification({
                  title: 'Error uploaded product',
                  message: err,
                  position: 'bl',
                  status: 'error',
                }));
            }
          );
    }
  }
}

export const deleteProduct = (id, shop, token) => dispatch => {
  if (token) {
    request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
              token,
              null,
              'DELETE'
            )).then(
              res => {
                dispatch(productActions.products.done.delete.product(id));
                dispatch(shopActions.shop.updateChip(0));
                dispatch(getShopCategories(shop));
                dispatch(sidebarActions.sidebar.hide())
                dispatch(addNotification({
                    title: 'Success',
                    message: 'Successfully deleted product',
                    position: 'bl',
                    status: 'success',
                }));
              }
          ).catch(
            err => {
              dispatch(addNotification({
                  title: 'Error deleting product',
                  message: err,
                  position: 'bl',
                  status: 'error',
                }));
            }
          );
  }
}

export const postImage = (token, shop, obj, id, key, status)  => dispatch => {
  const apiRequest = new FormData();

  apiRequest.append('image', obj.file);
  apiRequest.append('alt_tag', obj.tag);

  if (token) {
    request(`/vendors/shops/${shop}/images/`, getConfig(
            token,
            apiRequest,
            'post'
          )).then(
            res => {
              if(res.id){
                if (status === 'EDIT') {
                    dispatch(productActions.products.ui.set.edit.image({ response: res, id, image: obj.file.preview }));
                    dispatch(addNotification({
                        title: 'Successfully uploaded image',
                        message: 'Image uploaded successfully. Please save product to make the update permanent',
                        position: 'bl',
                        status: 'success',
                    }));
                } else {
                    dispatch(categoryActions.categories.done.post.productImage({ response: res, id, key }));
                    dispatch(addNotification({
                        title: 'Successfully uploaded image',
                        message: 'Image uploaded successfully. Please save product to make the update permanent',
                        position: 'bl',
                        status: 'success',
                    }));
                    dispatch(imageUploaderActions.imageUploader.upload.inc());
                    if (status === 'CROPED') {
                      dispatch(imageUploaderActions.imageUploader.hide());
                    }

                  if(status === 'DONE') {
                    console.log('this should do something')
                  }
                }
              }
            }
          ).catch(
            err => {
              dispatch(categoryActions.categories.done.post.productImage( new Error(err), { id, key } ));
              dispatch(addNotification({
                  title: 'Error during uploading image',
                  message: err,
                  position: 'bl',
                  status: 'error',
              }));
            }
          );
  }
}

//ToDo: figure out error reporting and notifications for this
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

  if (signal !== 'DONE_ALL') {
    if (token) {
      request(`/vendors/category/attributes/`, getConfig(
              token,
              {
                name: name,
                value: value,
              },
              'POST'
            )).then(
              obj => {
                dispatch({type: 'RESPONSE_API_DEBUG',payload:obj});

                if (obj.id) {
                  if (primary) {
                    dispatch(categoryActions.categories.done.post.customAttr.idPrimary({
                        newID: obj.id,
                        oldID: id
                    }));
                  } else {
                    dispatch(categoryActions.categories.done.post.customAttr.idSecondary({
                      newID: obj.id,
                      oldID: id, primaryID,
                    }));
                  }
                } else {
                  dispatch({
                    type: 'ERROR_SET_CUSTOM_ATTRIBUTE',
                    payload: obj,
                  })
                }

                if (signal === 'DONE_PRIMARY') {
                  dispatch(categoryActions.categories.done.post.customAttr.primary());
                }

                if (signal === 'DONE_SECONDARY') {
                  dispatch(categoryActions.categories.done.post.customAttr.secondary())
                }
              }
            );
    }
  } else {
      if (!customPrimary) {
        dispatch(categoryActions.categories.done.post.customAttr.primary())
      }

      if (!customSecondary) {
        dispatch(categoryActions.categories.done.post.customAttr.secondary())
      }
  }
}

export const getFeaturedProduct = shop => dispatch => {

  request(`/shops/${shop}/featured-products/`, getConfig()
          ).then(
            res => {
              dispatch(productActions.products.done.get.featuredProducts(res));
            }
          )
}

export const makeFeaturedProduct = (id, shop, token) => dispatch => {

  if (token) {
    request(`/vendors/shops/${shop}/featured-products/`, getConfig(
            token,
            {
              product: `${id}`,
            },
            'post'
          )).then(
            res => {
              dispatch(getFeaturedProduct(shop));

              dispatch(sidebarActions.sidebar.hide());
              dispatch(addNotification({
                title: 'Success',
                message: 'Successfully featured product',
                position: 'bl',
                status: 'success',
              }));
            }
          );
  }
}

export const removeFromFeaturedProduct = (productID, featuredID, shop, token) => dispatch => {

  if (token) {
    request(`/vendors/shops/${shop}/featured-products/${featuredID}/`, getConfig(
            token,
            null,
            'DELETE'
          )).then(
            res => {
              dispatch(productActions.products.done.delete.featuredProduct(productID));
              dispatch(sidebarActions.sidebar.hide());
              dispatch(addNotification({
                title: 'Success',
                message: 'Successfully removed from featured product',
                position: 'bl',
                status: 'success',
              }));
            }
          )
  }
}
