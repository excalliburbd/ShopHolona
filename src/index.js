import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import store from './store/configureStore';

import theme from '../public/react-toolbox/theme';

import '../public/react-toolbox/theme.css';

import App from './components/App';
import Dashboard from './components/Dashboard';
import BackOffice from './components/BackOffice';
import Settings from './components/Settings';

import NavigationContainer from './containers/NavigationContainer';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <NavigationContainer>
          <Route exact path="/" component={ App }/>
          <Route exact path="/dashboard" component={ Dashboard }/>
          <Route exact path="/settings" component={ Settings }/>
        </NavigationContainer>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
