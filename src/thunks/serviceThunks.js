// import { request, getConfig } from './helpers';

// import { getShopCategories } from './shopThunks';

// import { sidebarActions } from '../actions/';
// import { shopActions } from '../actions/';
// import { productActions } from '../actions/';
// import { categoryActions } from '../actions/';
// import { imageUploaderActions } from '../actions/';

// export const getCategory = () => dispatch => {

//   request('/api/references/categories/', getConfig() ).then(
//             res => {
//               dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

//               dispatch(categoryActions.categories.done.get.category(res));
//             }
//           );
// }

// export const getSubCategory = id => dispatch => {

//   request(`/api/references/categories/${id}/`, getConfig() ).then(
//             res => {
//               dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

//               dispatch(categoryActions.categories.done.get.subCategory(res));
//             }
//           );
// }

// export const getSubSubCategory = (id, subID )=> dispatch => {

//   request(`/api/references/categories/${id}/${subID}/`, getConfig() ).then(
//             res => {
//               dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

//               dispatch(categoryActions.categories.done.get.subSubCategory(res));
//             }
//           );
// }


// export const getAllProducts = shop  => dispatch => {

//   request(`/api/shops/${shop}/products/`, getConfig() ).then(
//             res => {
//               dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

//               dispatch({
//                 type: 'DONE_API_GET_PRODUCT',
//               })

//               dispatch(productActions.products.done.get.products(res));
//             }
//           );
// }

// export const saveProduct = (obj, shop, token) => dispatch => {

//   request(`/api/vendors/shops/${shop}/products/`, getConfig(
//             token,
//             obj,
//             'POST'
//           )).then(
//             res => {
//               dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

//               dispatch({
//                 type: 'DONE_API_ADD_PRODUCT',
//                 payload: res,
//               });

//               dispatch(getAllProducts(shop));
//               dispatch(getShopCategories(shop));
//             }
//           );
// }


// export const deleteProduct = (id, shop, token) => dispatch => {

//   request(`/api/vendors/shops/${shop}/products/${id}/`, getConfig(
//               token,
//               null,
//               'DELETE'
//             )).then(
//               res => {
//                 dispatch({type: 'RESPONSE_API_DEBUG',payload:res})

//                 dispatch(productActions.products.done.delete.product(id));

//                 dispatch(shopActions.shop.updateChip(0));

//                 dispatch(getShopCategories(shop));

//                 dispatch(sidebarActions.sidebar.hide())
//               }
//           );
// }

// export const postImage = (token, shop, obj, id, key, status)  => dispatch => {

//   const apiRequest = new FormData();

//   apiRequest.append('image', obj.file);
//   apiRequest.append('alt_tag', obj.tag);

//   request(`/api/vendors/shops/${shop}/images/`, getConfig(
//             token,
//             apiRequest,
//             'POST'
//           )).then(
//             res => {
//               dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

//               if(res.id){
//                 dispatch(categoryActions.categories.done.post.productImage({ response: res, id, key }));

//                 dispatch(imageUploaderActions.imageUploader.upload.inc())

//                 if (status === 'CROPED') {
//                   dispatch(imageUploaderActions.imageUploader.hide());
//                 }
//               }

//               if(status === 'DONE') {
//                 dispatch({
//                   type: 'INVALIDATE_PRODUCT_IMGAES',
//                   payload: { id, key }
//                 })
//               }
//             }
//           ).catch(
//             err => {
//               dispatch(categoryActions.categories.done.post.productImage( new Error(err), { id, key } ));
//             }
//           );
// }

// export const  requestAttribute = (
//   token,
//   name,
//   value,
//   id,
//   primary,
//   primaryID,
//   signal,
//   customPrimary,
//   customSecondary
// )  => dispatch => {

//   if (signal !== 'DONE_ALL') {
//         request(`/api/vendors/category/attributes/`, getConfig(
//               token,
//               {
//                 name: name,
//                 value: value,
//               },
//               'POST'
//             )).then(
//               obj => {
//                 dispatch({type: 'RESPONSE_API_DEBUG',payload:obj});

//                 if (obj.id) {
//                   if (primary) {
//                     dispatch(categoryActions.categories.done.post.customAttr.idPrimary(
//                       {
//                         newID: obj.id,
//                         oldID: id
//                       }));
//                   } else {
//                     dispatch(categoryActions.categories.done.post.customAttr.idSecondary(
//                       {
//                         newID: obj.id,
//                         oldID: id, primaryID,
//                       }));
//                   }
//                 } else {
//                   dispatch({
//                     type: 'ERROR_SET_CUSTOM_ATTRIBUTE',
//                     payload: obj,
//                   })
//                 }

//                 if (signal === 'DONE_PRIMARY') {
//                   dispatch(categoryActions.categories.done.post.customAttr.primary());
//                 }

//                 if (signal === 'DONE_SECONDARY') {
//                   dispatch(categoryActions.categories.done.post.customAttr.secondary())
//                 }
//               }
//             );
//   } else {
//       if (!customPrimary) {
//         dispatch(categoryActions.categories.done.post.customAttr.primary())
//       }

//       if (!customSecondary) {
//         dispatch(categoryActions.categories.done.post.customAttr.secondary())
//       }
//   }
// }

// export const getFeaturedProduct = shop => dispatch => {

//   request(`/api/shops/${shop}/featured-products/`, getConfig()
//           ).then(
//             res => {
//               dispatch(productActions.products.done.get.featuredProducts(res));
//             }
//           );
// }

// export const makeFeaturedProduct = (id, shop, token) => dispatch => {

//   if (token) {
//     request(`/api/vendors/shops/${shop}/featured-products/`, getConfig(
//             token,
//             {
//               product: `${id}`,
//             },
//             'POST'
//           )).then(
//             res => {
//               dispatch({type: 'RESPONSE_API_DEBUG',payload:res});

//               dispatch({
//                 type: 'DONE_API_MAKE_FEATURED_PRODUCT',
//                 payload: res,
//               });

//               dispatch(getFeaturedProduct(shop));

//               dispatch(sidebarActions.sidebar.hide());
//             }
//           );
//   }
// }

// export const removeFromFeaturedProduct = (productID, featuredID, shop, token) => dispatch => {

//   if (token) {
//     request(`/api/vendors/shops/${shop}/featured-products/${featuredID}/`, getConfig(
//             token,
//             null,
//             'DELETE'
//           )).then(
//             res => {
//               dispatch(productActions.products.done.delete.featuredProduct(productID));

//               dispatch(sidebarActions.sidebar.hide());
//             }
//           );
//   }
// }
