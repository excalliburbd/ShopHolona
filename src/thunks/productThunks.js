import {
  request,
  getConfig,
  fromState,
} from './helpers';
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
              dispatch(categoryActions.categories.done.get.category(res));
            }
          );
}

export const getSubCategory = id => dispatch => {
  request(`/references/categories/${id}/`, getConfig() ).then(
            res => {
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

export const getAllProducts = (shop, token, id) => (dispatch, getState) => {
  const {
    demostore,
  } = fromState(getState);


  request(`/shops/${shop}/products/`, getConfig() ).then(
            res => {

              dispatch(productActions.products.done.get.products(
                res.filter(
                  product => product.variances.length > 0 && product.variances[0].attributes.length > 0
                )
              ));

              if (demostore && id) {
                request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
                          token,
                          null,
                          'DELETE'
                        ));
              }
            }
          );
}

//ToDo: figure out error reporting and notifications for this
export const  requestAttribute = (
  token,
  name,
  value,
  id,
  primary,
  primaryID
)  => dispatch => {
  if (token) {
   return request(`/vendors/category/attributes/`, getConfig(
                    token,
                    {
                      name: name,
                      value: value,
                    },
                    'POST'
                  )).then(
                    obj => ({
                      ...obj,
                      type: id,
                      primary,
                      primaryID
                    })
                  )
  }
}

export const saveProduct = (obj, shop, token, editing) => (dispatch, getState) => {
  const {
    demostore,
  } = fromState(getState);

  if (editing) {
    const {
      id,
      name,
      short_desc,
    } = obj;
    const price = Math.round(obj.price);
    const sh_price = Math.round(obj.sh_price);
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
                              weight,
                              price,
                              sh_price,
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
                message: 'Successfully updated product name',
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
                            dispatch(productActions.products.ui.set.name({
                              id: res.id,
                              name
                            }));
                            dispatch(productActions.products.ui.reset.product(res));
                            dispatch(addNotification({
                              title: 'Success',
                              message: 'Successfully updated product name',
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
                  message: 'Successfully updated product description',
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
                            dispatch(productActions.products.ui.set.desc({
                              id: res.id,
                              desc: short_desc
                            }));
                            dispatch(productActions.products.ui.reset.product(res));
                            dispatch(addNotification({
                              title: 'Success',
                              message: 'Successfully updated product description',
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
                  dispatch(productActions.products.ui.set.attribute({
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
                            sh_price: attr.sh_price,
                            stock: attr.stock
                          },
                          'PATCH'
                        )).then(
                          res => {
                            dispatch(productActions.products.ui.set.attribute({
                              id,
                              variantID: attr.variantID,
                              attrID: attr.attrID,
                              attr,
                            }));
                            request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
                                      token,
                                    )).then(
                                      res => {
                                        if (res.id) {
                                          dispatch(productActions.products.ui.reset.product(res));
                                        }
                                      }
                                    );
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

                            console.log(err);
                            //TODO:

                            // if (info.??) {
                              dispatch(addNotification({
                                title: 'Error during product update',
                                message: 'error',
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
                  dispatch(productActions.products.ui.set.attribute({
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
                            sh_price: attr.sh_price,
                            stock: attr.stock
                          },
                          'POST'
                        )).then(
                          res => {
                            dispatch(productActions.products.ui.set.attribute({
                              id,
                              variantID: attr.variantID,
                              attrID: attr.attrID,
                              attr,
                            }));
                            request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
                                      token,
                                    )).then(
                                      res => {
                                        if (res.id) {
                                          dispatch(productActions.products.ui.reset.product(res));
                                        }
                                      }
                                    );
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
                        dispatch(productActions.products.ui.set.attribute({
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
                                    sh_price: attr.sh_price,
                                  },
                                  'PATCH'
                                )).then(
                                  res => {
                                    request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
                                      token,
                                    )).then(
                                      res => {
                                        if (res.id) {
                                          dispatch(productActions.products.ui.reset.product(res));
                                        }
                                      }
                                    );
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
          case 'image'://not impleamented
            editedImages.forEach(
              variance => {
                const {
                  id : varianceID,
                  images,
                } = variance;

              if (demostore) {
                dispatch(addNotification({
                    title: 'Success',
                    message: 'Successfully updated product',
                    position: 'bl',
                    status: 'success',
                }));
              } else {
                request(`/vendors/shops/${shop}/products/${id}/variances/${varianceID}/`, getConfig(
                        token,
                        {
                          images
                        },
                        'PATCH'
                      )).then(
                        res => {
                          request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
                                      token,
                                    )).then(
                                      res => {
                                        if (res.id) {
                                          dispatch(productActions.products.ui.reset.product(res));
                                        }
                                      }
                                    );
                          dispatch(addNotification({
                            title: 'Success',
                            message: 'Successfully updated product',
                            position: 'bl',
                            status: 'success',
                          }));
                        }
                      ).catch(
                        err => {
                          console.log(err)
                          dispatch(addNotification({
                              title: 'Success',
                              message: 'Successfully updated product',
                              position: 'bl',
                              status: 'success',
                          }));
                          returnArr = [ ...arr, infoKey ];
                        }
                    );
                }
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
    const requestPool = [];

    obj.variances.forEach(
        (primaryObj, primaryKey) => {
          if(primaryObj.custom) {
            requestPool.push(dispatch(requestAttribute(
              token,
              primaryObj.key,
              primaryObj.value,
              primaryObj.type,
              true,
              null
            )));
          }
          primaryObj.attributes.forEach(
            (secondaryObj, secondaryKey) => {
              if (secondaryObj.custom) {
                requestPool.push(dispatch(requestAttribute(
                  token,
                  secondaryObj.key,
                  secondaryObj.value,
                  secondaryObj.type,
                  false,
                  primaryObj.type
                )));
              }

            }
          )
    });

    Promise.all(requestPool).then(
      res => {
        const finalProduct = {
            name: obj.name,
            short_desc: obj.short_desc,
            category: obj.category,
            variances: obj.variances.map(
                        variant => {
                          const variantMatch = res.find(
                            primary => primary.type === variant.type
                          );

                          if (variantMatch && variantMatch.id) {
                            return {
                              type: variantMatch.id,
                              images: variant.images,
                              attributes: variant.attributes
                                          .map(
                                            attr => {
                                              const attrMatch = res.find(
                                                secondary => secondary.type === attr.type
                                              );

                                              const common = {
                                                  description: attr.description,
                                                  weight: attr.weight,
                                                  price: attr.price,
                                                  sh_price: attr.sh_price,
                                                  stock: attr.stock,
                                              }

                                              if (attrMatch && attrMatch.id) {
                                                return {
                                                  type: attrMatch.id,
                                                  ...common,
                                                }
                                              }

                                              return {
                                                  type: attr.type,
                                                  ...common,
                                              }
                                            }
                                          )
                            }
                          }

                          return {
                              type: variant.type,
                              images: variant.images,
                              attributes: variant.attributes
                                          .map(
                                            attr => {
                                              const attrMatch = res.find(
                                                secondary => secondary.type === attr.type
                                              );
                                              const common = {
                                                  description: attr.description,
                                                  weight: attr.weight,
                                                  price: attr.price,
                                                  sh_price: attr.sh_price,
                                                  stock: attr.stock,
                                              }

                                              if (attrMatch && attrMatch.id) {
                                                return {
                                                  type: attrMatch.id,
                                                  ...common,
                                                }
                                              }

                                              return {
                                                  type: attr.type,
                                                  ...common,
                                              }
                                            }
                                          )
                            }
                        }),
          status: 3,
        }

        if (finalProduct.category.custom) {
          request(`/vendors/category/${finalProduct.category.category}/${finalProduct.category.subCategory}/subcategories/`, getConfig(
                    token,
                    {
                      name: finalProduct.category.name,
                      bang_name: 'custom_category'
                    },
                    'POST'
                  )).then(
                    res => {
                      if (res.id) {
                        request(`/vendors/shops/${shop}/products/`, getConfig(
                                  token,
                                  {
                                    ...finalProduct,
                                    category: res.id
                                  },
                                  'POST'
                                )).then(
                                  res => {
                                    if (demostore) {
                                      if (res.id) {
                                        dispatch(sidebarActions.sidebar.hide());
                                        dispatch(getAllProducts(shop, token, res.id));
                                        dispatch(getShopCategories(shop));
                                        dispatch(addNotification({
                                          title: 'Success',
                                          message: 'Successfully uploaded product',
                                          position: 'bl',
                                          status: 'success',
                                        }));
                                      }
                                    } else {
                                      dispatch(sidebarActions.sidebar.hide());
                                      dispatch(getAllProducts(shop, null, null));
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
                  ).catch(
                    err => {
                      dispatch(addNotification({
                          title: 'Error Creating Custom Category',
                          message: err,
                          position: 'bl',
                          status: 'error',
                        }));
                    }
                  )
        } else {
          request(`/vendors/shops/${shop}/products/`, getConfig(
                token,
                finalProduct,
                'POST'
              )).then(
                res => {
                  if (demostore) {
                    if (res.id) {
                      dispatch(sidebarActions.sidebar.hide());
                      dispatch(getAllProducts(shop, token, res.id));
                      dispatch(getShopCategories(shop));
                      dispatch(addNotification({
                        title: 'Success',
                        message: 'Successfully uploaded product',
                        position: 'bl',
                        status: 'success',
                      }));
                    }
                  } else {
                    dispatch(sidebarActions.sidebar.hide());
                    dispatch(getAllProducts(shop, null, null));
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
    ).catch(
      err => {
        console.log(err)
        dispatch(addNotification({
                  title: 'Error saving product',
                  message: err,
                  position: 'bl',
                  status: 'error',
                }));
      }
    );
  }
}

export const deleteProduct = (id, shop, token) => (dispatch, getState) => {
  const {
    demostore,
  } = fromState(getState);

  if (demostore) {
    dispatch(productActions.products.done.delete.product(id));
    dispatch(sidebarActions.sidebar.hide());
    dispatch(addNotification({
        title: 'Success',
        message: 'Successfully deleted product',
        position: 'bl',
        status: 'success',
    }));
  } else {
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
                  dispatch(sidebarActions.sidebar.hide());
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
}

export const postImage = (token, shop, obj, id, key, status)  => dispatch => {
  const apiRequest = new FormData();

  apiRequest.append('image', obj.file);
  apiRequest.append('alt_tag', obj.tag);

  if (token) {
    request(`/vendors/shops/${shop}/images/`, getConfig(
            token,
            apiRequest,
            'POST'
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

export const getFeaturedProduct = shop => dispatch => {

  request(`/shops/${shop}/featured-products/`, getConfig()
          ).then(
            res => {
              dispatch(productActions.products.done.get.featuredProducts(res));
            }
          )
}

export const makeFeaturedProduct = (id, shop, token) => (dispatch, getState) => {
  const {
    demostore,
  } = fromState(getState);

  if (demostore) {
    dispatch(productActions.products.ui.set.featuredProduct({ remove: false, id }));
    dispatch(sidebarActions.sidebar.hide());
    dispatch(addNotification({
      title: 'Success',
      message: 'Successfully featured product',
      position: 'bl',
      status: 'success',
    }));
  } else {
    if (token) {
      request(`/vendors/shops/${shop}/featured-products/`, getConfig(
              token,
              {
                product: `${id}`,
              },
              'POST'
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
}

export const removeFromFeaturedProduct = (productID, featuredID, shop, token) => (dispatch, getState) => {
  const {
    demostore,
  } = fromState(getState);

  if (demostore) {
    dispatch(productActions.products.ui.set.featuredProduct({ remove: true, id: productID }));
    dispatch(sidebarActions.sidebar.hide());
    dispatch(addNotification({
      title: 'Success',
      message: 'Successfully featured product',
      position: 'bl',
      status: 'success',
    }));
  } else {
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
}

export const getAllAttributes = () => (dispatch, getState) => {
  const token = getState().user.token;

  if (token) {
      request(`/vendors/category/attributes/`, getConfig(
                token
              )).then(
                res => {
                  (res.length > 0) && dispatch(productActions.products.done.get.attributes(res));
                }
            )
  }
}
