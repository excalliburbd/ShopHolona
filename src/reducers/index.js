import { combineReducers } from 'redux';

import { FilterUIReducer } from './filterUIReducer';
import { OrdersReducer, OrdersEntityReducer } from './ordersReducers';
import { UserReducer, UserUIReducer, userDetailsReducer } from './usersReducers';
import { productsReducer, featuredProductsReducer, productsEntityReducer, ProductsUIReducer } from './productsReducers';
import { BackOfficeUIReducer } from './backOfficeReducers';
import {
  categoriesReducer,
  CategoriesEntityReducer,
  CategoriesUIReducer
} from './categoriesReducers';
import { SidebarUIReducer } from './sidebarReducers';
import { ShopPageReducer, ShopPageUIReducer } from './shopReducers'

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

const imageUploaderUIReducer = (
  state = {
    active: false,
    dropped: false,
    image: null,
    slider: 1,
    type: null,
  }, action
) => {
  switch (action.type) {
    case 'SHOW_IMAGE_UPLOADER':
     return {
       ...state,
       active: true,
       type: action.payload,
     }
    case 'HIDE_IMAGE_UPLOADER':
     return {
       ...state,
       active: false,
       dropped: false,
       image: null,
       slider: 1
     }
    case 'SHOW_IMAGE_UPLOADER_EDITOR':
      return {
        ...state,
        dropped: true,
        image: action.payload[0].preview,
      }
    case 'UPDATE_IMAGE_UPLOADER_SLIDER':
      return {
        ...state,
        slider: action.payload,
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
    categoryEntities: CategoriesEntityReducer,
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
  })
});

export default RootReducer;
