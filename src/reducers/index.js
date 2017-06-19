import { combineReducers } from 'redux';
import {reducer as responsive } from 'redux-mediaquery';

import { FilterUIReducer } from './filterUIReducers';
import { OrdersReducer, OrdersEntityReducer } from './ordersReducers';

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
  orders: OrdersReducer,
  entities: combineReducers({
    orders: OrdersEntityReducer,
    products: productsEntityReducer,
    categories: CategoriesEntityReducer,
    cart: cartEntitiesReducer,
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
  }),
  cart: cartReducer,
});

export default RootReducer;
