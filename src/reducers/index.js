import { combineReducers } from 'redux';
import {reducer as responsive } from 'redux-mediaquery';
import { reducer as notificationsReducer } from 'reapop';
// import { createForms } from 'react-redux-form';

import { FilterUIReducer } from './filterUIReducers';
import { ordersReducer, ordersEntityReducer } from './ordersReducers';
import {
  banksReducer,
  banksEntityReducer,
  paymentandaddressUIReducer,
  addressesEntityReducer,
} from './paymentandaddressReducers';
import {
  UserReducer,
  UserUIReducer,
} from './usersReducers';
import {
  productsReducer,
  featuredProductsReducer,
  productsEntityReducer,
  ProductsUIReducer
} from './productsReducers';
import { BackOfficeUIReducer } from './backOfficeReducers';
import {
  categoriesReducer,
  CategoriesEntityReducer,
  CategoriesUIReducer
} from './categoriesReducers';
import { SidebarUIReducer } from './sidebarReducers';
import { ShopPageReducer, ShopPageUIReducer } from './shopReducers';
import { imageUploaderUIReducer } from './imageUploaderReducers';
import { servicesUIReducer } from './serviceReducers';
import { cartReducer, cartEntitiesReducer } from './cartReducers';
import { tourUIReducer } from './tourReducers';
import { confirmDialougReducers } from './confirmDialougReducers';

const NavigationUIReducer = (
  state = {
    searchbar: false,
  }, action
) => {
  switch (action.type) {
    case 'SHOW_NAVIGATION_SEARCHBAR':
     return {
       ...state,
       searchbar: true,
     }
    case 'HIDE_NAVIGATION_SEARCHBAR':
     return {
       ...state,
       searchbar: false,
     }
    default:
      return state;
  }
}

const RootReducer = combineReducers({
  user: UserReducer,
  shop: ShopPageReducer,
  categories: categoriesReducer,
  products: productsReducer,
  featuredProducts: featuredProductsReducer,
  orders: ordersReducer,
  banks: banksReducer,
  entities: combineReducers({
    products: productsEntityReducer,
    categories: CategoriesEntityReducer,
    cart: cartEntitiesReducer,
    orders: ordersEntityReducer,
  }),
  cachedEntities: combineReducers({
    banks: banksEntityReducer,
    addresses: addressesEntityReducer,
  }),
  ui: combineReducers({
    filter: FilterUIReducer,
    nav: NavigationUIReducer,
    backOffice: BackOfficeUIReducer,
    sidebar: SidebarUIReducer,
    user: UserUIReducer,
    shopPage: ShopPageUIReducer,
    categories: CategoriesUIReducer,
    product: ProductsUIReducer,
    uploader: imageUploaderUIReducer,
    service: servicesUIReducer,
    responsive,
    paymentsAndAddresses: paymentandaddressUIReducer,
    tour: tourUIReducer,
    confirm: confirmDialougReducers,
  }),
  cart: cartReducer,
  notifications: notificationsReducer(),
  // forms: combineFormscle({

  // }, 'forms'),
});

export default RootReducer;
