import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import registerServiceWorker from './registerServiceWorker';
import store from './store/configureStore';
import { history } from './store/configureStore';
import theme from './react-toolbox/theme';

import './react-toolbox/theme.css';

import NavigationContainer from './containers/NavigationContainer';
import DashboardContainer from './containers/DashboardContainer';
import BackOfficeContainer from './containers/BackOfficeContainer';
import ShopPageContainer from './containers/ShopPageContainer';
import SettingsContainer from './containers/SettingsContainer';

import './index.css';
import 'trmix/dist/trmix.min.js';

ReactDOM.render(
  <Provider store={store}>
   <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
          <NavigationContainer>
            <Route exact path="/" component={ ShopPageContainer }/>
            <Route exact path="/dashboard" component={ DashboardContainer }/>
            <Route exact path="/admin/:backOffice" component={ BackOfficeContainer } />
            <Route exact path="/settings" component={ SettingsContainer }/>
          </NavigationContainer>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
