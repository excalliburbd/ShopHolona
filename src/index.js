import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import store from './store/configureStore';

import theme from '../public/react-toolbox/theme';

import '../public/react-toolbox/theme.css';

import App from './components/App';
import FilterBar from './components/FilterBar';
import Dashboard from './components/Dashboard';
import Order from './components/Order';
import Products from './components/Products';
import Reports from './components/Reports';
import Reviews from './components/Reviews';
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
          <Route exact path="/order" component={ Order }/>
          <Route exact path="/products" component={ Products }/>
          <Route exact path="/reports" component={ Reports }/>
          <Route exact path="/reviews" component={ Reviews }/>
          <Route exact path="/settings" component={ Settings }/>
        </NavigationContainer>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
