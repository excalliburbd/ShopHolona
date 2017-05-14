import { combineReducers } from 'redux';

import { FilterUIReducer } from './filterUIReducer';
import { OrdersReducer, OrdersEntityReducer } from './ordersReducers';
import { UserReducer, UserUIReducer } from './usersReducers';
import { ProductsReducer, ProductsEntityReducer } from './productsReducers';
import { BackOfficeUIReducer } from './backOfficeReducers';
import { CategoriesEntityReducer, CategoriesUIReducer } from './categoriesReducers';

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

const SidebarUIReducer = (
  state = {
    show: false,
    type: null,
    radio: 'NONE'
  }, action
) => {
  switch (action.type) {
    case 'SHOW_SIDEBAR_SIGNIN':
      return {
        ...state,
        show: true,
        type: 'SIGNIN'
      }
    case 'SHOW_SIDEBAR_ADD_PRODUCT':
      return {
        ...state,
        show: true,
        type: 'ADD_PRODUCT'
      }
    case 'HIDE_SIDEBAR':
      return {
        ...state,
        show: false,
        type: null,
      }
    case 'SET_SIDEBAR_UI_RADIO_VALUE':
      return {
        ...state,
        radio: action.payload
      }
    default:
      return state;
  }
}

const ShopPageUIReducer = (
  state = {
    details: false,
  } , action
) => {
  switch (action.type) {
    case 'TOGGLE_SHOPPAGE_UI_DETAILS':
      return {
        ...state,
        details: !state.details,
      }
    default:
      return state;
  }
}

const ShopPageReducer = (
  state = {
    id: 3,
    name: 'Real Shop',
    shortDescription: 'We are the real shop man. We are like, really real',
    longDescription: 'We are like, really really really really really really really really really really really really really really really really really really really really really really really really really really really real',
  }, action
) => {
  switch (action.type) {
    default:
      return state;
  }
}

const RootReducer = combineReducers({
  user: UserReducer,
  shop: ShopPageReducer,
  products: ProductsReducer,
  orders: OrdersReducer,
  entities: combineReducers({
    orders: OrdersEntityReducer,
    products: ProductsEntityReducer,
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
  })
});

export default RootReducer;
