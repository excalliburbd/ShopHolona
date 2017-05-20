import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { offline } from 'redux-offline';
import defaultConfig from 'redux-offline/lib/defaults';

import RootReducer from '../reducers';

export default  offline(defaultConfig)(createStore)(
  RootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);
