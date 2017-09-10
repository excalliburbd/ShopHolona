import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

// import { unregister } from './registerServiceWorker';
// import store from './store/configureStore';
import { history } from './store/configureStore';
import theme from './themes/react-toolbox/theme';

import './themes/react-toolbox/theme.css';

import NavigationContainer from './containers/NavigationContainer';
import DashboardContainer from './containers/DashboardContainer';
import BackOfficeContainer from './containers/BackOfficeContainer';
import ShopPageContainer from './containers/ShopPageContainer';
import SettingsContainer from './containers/SettingsContainer';

import './index.css';
import 'trmix/dist/trmix.min.js';
import './variables.css';


class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <Switch>
              <Route exact path="/" component={ShopPageContainer} />
              <Route exact path="/dashboard" component={DashboardContainer} />
              <Route exact path="/admin/:backOffice" component={BackOfficeContainer} />
              <Route exact path="/settings" component={SettingsContainer} />
              <Redirect to="/not-found" />
            </Switch>
          </NavigationContainer>
        </ThemeProvider>
      </ConnectedRouter>
    )
  }
}

export default App;