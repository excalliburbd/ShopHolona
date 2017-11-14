import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import { history } from './store/configureStore';
import theme from './themes/react-toolbox/theme';

import './themes/react-toolbox/theme.css';

import NavigationContainer from './containers/NavigationContainer';
import DashboardContainer from './containers/DashboardContainer';
import BackOfficeContainer from './containers/BackOfficeContainer';
import ShopPageContainer from './containers/ShopPageContainer';
import SettingsContainer from './containers/SettingsContainer';
import AuthRouteContainer from './containers/AuthRouteContainer';

import './index.css';
import 'trmix/dist/trmix.min.js';
import './variables.css';


const App = () => (
  <ConnectedRouter history={history}>
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Switch>
          <AuthRouteContainer exact path="/dashboard" component={DashboardContainer} />
          <AuthRouteContainer exact path="/admin/:backOffice" component={BackOfficeContainer} />
          <AuthRouteContainer exact path="/settings" component={SettingsContainer} />
          <Route path="/" component={ShopPageContainer} />
          <Redirect to="/not-found" />
        </Switch>
      </NavigationContainer>
    </ThemeProvider>
  </ConnectedRouter>
)

export default App;
