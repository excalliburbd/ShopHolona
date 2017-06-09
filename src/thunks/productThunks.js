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

  dispatch({
    type: 'START_API_GET_PRODUCT',
    payload: { shop },
  })

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

export const saveProduct = (obj, shop, token) => dispatch => {
  request(`/vendors/shops/${shop}/products/`, getConfig(
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

  request(`/vendors/shops/${shop}/products/${id}/`, getConfig(
              token,
              null,
              'delete'
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

export const postImage = (token, shop, obj, id, key, status)  => dispatch => {

  dispatch({
    type: 'POST_API_PRODUCT_IMGAE',
  })

  const apiRequest = new FormData();

  apiRequest.append('image', obj.file);
  apiRequest.append('alt_tag', obj.tag);

  request(`/vendors/shops/${shop}/images/`, getConfig(
            token,
            apiRequest,
            'post'
          )).then(
            res => {
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
          ).catch(
            err => {
              dispatch(categoryActions.categories.done.post.productImage( new Error(err), { id, key } ));
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
        request(`/vendors/category/attributes/`, getConfig(
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

  dispatch({
    type: 'START_API_GET_FEATURED_PRODUCT',
    payload: { shop }
  });

  request(`/shops/${shop}/featured-products/`, getConfig()
          ).then(
            res => {
              dispatch(productActions.products.done.get.featuredProducts(res));
            }
          )
}

export const makeFeaturedProduct = (id, shop, token) => dispatch => {

  dispatch({
    type: 'START_API_MAKE_FEATURED_PRODUCT',
    payload: {id, shop, token}
  });

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
          )
}

export const removeFromFeaturedProduct = (productID, featuredID, shop, token) => dispatch => {

  dispatch({
    type: 'START_API_REMOVE_FEATURED_PRODUCT',
    payload: {productID, featuredID, shop, token}
  });

  request(`/vendors/shops/${shop}/featured-products/${featuredID}/`, getConfig(
            token,
            null,
            'delete'
          )).then(
            res => {
              dispatch(productActions.products.done.delete.featuredProduct(productID));

              dispatch(sidebarActions.sidebar.hide());
            }
          )
}
