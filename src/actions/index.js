import { createActions } from 'redux-actions';

import { userActionCreators } from './userActionCreators';
import { sidebarActionCreators } from './sidebarActionCreators';
import { shopActionCreators } from './shopActionCreators';
import { productActionCreators } from './productActionCreators';
import { categoryActionCreators } from './categoryActionCreators';
import { imageUploaderActionCreators } from './imageUploaderActionCreators';
import { cartActionCreators } from './cartActionCreators';
import { serviceActionCreators } from './serviceActionCreators';
import { orderActionCreators } from './orderActionCreators';
import { paymentandaddressActionCreators } from './paymentandaddressActionCreators';
import { tourActionCreators } from './tourActionCreators';
import { confirmActionCreators } from './confirmActionCreators';
import { navigationActionCreators } from './navigationActionCreators';

export const userActions = createActions(userActionCreators);
export const sidebarActions = createActions(sidebarActionCreators);
export const shopActions = createActions(shopActionCreators);
export const productActions = createActions(productActionCreators);
export const categoryActions = createActions(categoryActionCreators);
export const imageUploaderActions = createActions(imageUploaderActionCreators);
export const cartActions = createActions(cartActionCreators);
export const serviceActions = createActions(serviceActionCreators);
export const orderActions = createActions(orderActionCreators);
export const paymentandaddressActions = createActions(paymentandaddressActionCreators);
export const tourActions = createActions(tourActionCreators);
export const confirmActions = createActions(confirmActionCreators);
export const navigationActions = createActions(navigationActionCreators);
