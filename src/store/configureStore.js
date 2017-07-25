import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import { offline } from 'redux-offline';
import defaultConfig from 'redux-offline/lib/defaults';

import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router';

import {REHYDRATE} from 'redux-persist/constants';
import createActionBuffer from 'redux-action-buffer';

import RootReducer from '../reducers';

export const history = createBrowserHistory();

const offlineConfig = {
  ...defaultConfig,
  persistOptions: {
    ...defaultConfig.persistOptions,
    blacklist: [
      'categories',
      'products',
      'featuredProducts',
      'orders',
      'cart',
      'entities',
      'ui',
      'router',
      'offline',
      'cart',
      'banks',
    ]
  }
}

export default offline(offlineConfig)(createStore)(
  connectRouter(history)(RootReducer),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      createActionBuffer(REHYDRATE),
    ),
  )
);
