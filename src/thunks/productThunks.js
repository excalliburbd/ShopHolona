import { request, getConfig } from './helpers';

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
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              dispatch(categoryActions.categories.done.get.subSubCategory(res));
            }
          );
}

export const getAllProducts = shop  => dispatch => {

  request(`/shops/${shop}/products/`, getConfig() ).then(
            res => {
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              dispatch({
                type: 'DONE_API_GET_PRODUCT',
              })

              dispatch(productActions.products.done.get.products(res));
            }
          );
}

export const saveProduct = (obj, shop, token, editing) => dispatch => {
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
            request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
                      token,
                      {
                        name
                      },
                      'PATCH'
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
          case 'desc':
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

                        }
                      }
                    ).catch(
                      err => {
                        returnArr = [ ...arr, infoKey ];
                      }
                    );
            return returnArr;
          case 'old_stock':
            oldEditedAttr.forEach(
              attr => {
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
                          console.log(res)
                        }
                      ).catch(
                        err => {
                          console.log(err)
                          returnArr = [ ...arr, infoKey ];
                        }
                    );
              }
            )
            return returnArr;
          case 'new_stock':
            newEditedAttr.forEach(
              attr => {
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
                          console.log(res)
                        }
                      ).catch(
                        err => {
                          console.log(err)
                          returnArr = [ ...arr, infoKey ];
                        }
                    );
              }
            )
            return returnArr;
          case 'price_weight':
            variances.forEach(
              ({ id: variantID, ...variant }) => {
                variant.attributes.forEach(
                  ({ id: attrID, ...attr}) => {
                    if (attrID) {
                      request(`/vendors/shops/${shop}/products/${id}/variances/${variantID}/attributes/${attrID}/`, getConfig(
                        token,
                        {
                          weight: attr.weight,
                          price: attr.price,
                        },
                        'PATCH'
                      )).then(
                        res => {
                          console.log(res)
                        }
                      ).catch(
                        err => {
                          console.log(err)
                          returnArr = [ ...arr, infoKey ];
                        }
                    );
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
                        }
                      ).catch(
                        err => {
                          console.log(err)
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
              dispatch(getAllProducts(shop));
              dispatch(getShopCategories(shop));
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
                dispatch({type: 'RESPONSE_API_DEBUG',payload:res})

                dispatch(productActions.products.done.delete.product(id));

                dispatch(shopActions.shop.updateChip(0));

                dispatch(getShopCategories(shop));

                dispatch(sidebarActions.sidebar.hide())
              }
          );
  }
}

export const postImage = (token, shop, obj, id, key, status)  => dispatch => {

  dispatch({
    type: 'POST_API_PRODUCT_IMGAE',
  })

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
              if (status === 'EDIT') {
                dispatch(productActions.products.ui.set.edit.image({ response: res, id, image: obj.file.preview }))
              } else {
                dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

                if(res.id){
                  dispatch(categoryActions.categories.done.post.productImage({ response: res, id, key }));

                  dispatch(imageUploaderActions.imageUploader.upload.inc())

                  if (status === 'CROPED') {
                    dispatch(imageUploaderActions.imageUploader.hide());
                  }
                }

                if(status === 'DONE') {
                  dispatch({
                    type: 'INVALIDATE_PRODUCT_IMGAES',
                    payload: { id, key }
                  })
                }
              }
            }
          ).catch(
            err => {
              dispatch(categoryActions.categories.done.post.productImage( new Error(err), { id, key } ));
            }
          );
  }
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
                    dispatch(categoryActions.categories.done.post.customAttr.idPrimary(
                      {
                        newID: obj.id,
                        oldID: id
                      }));
                  } else {
                    dispatch(categoryActions.categories.done.post.customAttr.idSecondary(
                      {
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
              dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

              dispatch({
                type: 'DONE_API_MAKE_FEATURED_PRODUCT',
                payload: res,
              });

              dispatch(getFeaturedProduct(shop));

              dispatch(sidebarActions.sidebar.hide());
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
            }
          )
  }
}
