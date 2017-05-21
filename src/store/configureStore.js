import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { offline } from 'redux-offline';
import defaultConfig from 'redux-offline/lib/defaults';

import RootReducer from '../reducers';

const offlineConfig = {
  ...defaultConfig,
  persistOptions: {
    ...defaultConfig.persistOptions,
    blacklist: ['userDetails', 'ui']
  }
}

export default  offline(offlineConfig)(createStore)(
  RootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);
