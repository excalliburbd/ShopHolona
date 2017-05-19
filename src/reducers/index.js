import { combineReducers } from 'redux';

import { FilterUIReducer } from './filterUIReducer';
import { OrdersReducer, OrdersEntityReducer } from './ordersReducers';
import { UserReducer, UserUIReducer } from './usersReducers';
import { productsReducer, productsEntityReducer, ProductsUIReducer } from './productsReducers';
import { BackOfficeUIReducer } from './backOfficeReducers';
import { categoriesReducer, CategoriesEntityReducer, CategoriesUIReducer } from './categoriesReducers';

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
    subType: null,
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
        type: 'ADD_PRODUCT',
        subType: 'ADD_PRODUCT'
      }
    case 'SHOW_SIDEBAR_ADD_PRODUCT_STOCK':
      return {
        ...state,
        show: true,
        type: 'ADD_PRODUCT',
        subType: 'ADD_PRODUCT_STOCK'
      }
    case 'SHOW_SIDEBAR_ADD_PRODUCT_IMAGES':
      return {
        ...state,
        show: true,
        type: 'ADD_PRODUCT',
        subType: 'ADD_PRODUCT_IMAGES'
      }
    case 'HIDE_SIDEBAR':
      return {
        ...state,
        show: false,
        type: null,
        subType: null,
        radio: 'NONE'
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
    categories: {

    },
    chip: 0,
  }, action
) => {
  switch (action.type) {
    case 'SET_SHOP_CATEGORY':
      const categories = {}

      action.payload.forEach(
        obj => {
          categories[obj.id] = obj
        }
      )

      return {
        ...state,
        categories: {
          ...state.categories,
          ...categories
        }
      }
    case 'UPDATE_SHOP_CHIP':
      return {
        ...state,
        chip: action.payload,
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
  })
});

export default RootReducer;
