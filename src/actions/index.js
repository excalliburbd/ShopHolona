import { createActions } from 'redux-actions';

import { userActionCreators } from './userActionCreators';
import { sidebarActionCreators } from './sidebarActionCreators';
import { shopActionCreators } from './shopActionCreators';
import { productActionCreators } from './productActionCreators';
import { categoryActionCreators } from './categoryActionCreators';
import { imageUploaderActionCreators } from './imageUploaderActionCreators';
import { serviceActionCreators } from './serviceActionCreators';

export const userActions = createActions(userActionCreators);
export const sidebarActions = createActions(sidebarActionCreators);
export const shopActions = createActions(shopActionCreators);
export const productActions = createActions(productActionCreators);
export const categoryActions = createActions(categoryActionCreators);
export const imageUploaderActions = createActions(imageUploaderActionCreators);
export const serviceActions = createActions(serviceActionCreators);
