import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import maybeYouMeant from 'maybe-you-meant';

import store from './store/configureStore';

import theme from '../public/react-toolbox/theme';

import '../public/react-toolbox/theme.css';

import App from './components/App';
import Settings from './components/Settings';

import NavigationContainer from './containers/NavigationContainer';
import DashboardContainer from './containers/DashboardContainer';
import BackOfficeContainer from './containers/BackOfficeContainer';

import './index.css';

maybeYouMeant();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <NavigationContainer>
          <Route exact path="/" component={ App }/>
          <Route exact path="/dashboard" component={ DashboardContainer }/>
          <Route path="/admin/:backOffice" component={ BackOfficeContainer } />
          <Route exact path="/settings" component={ Settings }/>
        </NavigationContainer>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
