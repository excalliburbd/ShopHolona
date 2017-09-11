import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { unregister } from './registerServiceWorker';

import store from './store/configureStore';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )
  });
}

unregister();
