import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import { offline } from 'redux-offline';
import defaultConfig from 'redux-offline/lib/defaults';

import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { REHYDRATE } from 'redux-persist/constants';
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

let store = connectRouter(history)(RootReducer);

if (process.env.NODE_ENV !== "production") {
  console.log("inside block")
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(connectRouter(history)(RootReducer));
    })
  }
}

export default offline(offlineConfig)(createStore)(
  store,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      createActionBuffer(REHYDRATE),
    ),
  )
);
