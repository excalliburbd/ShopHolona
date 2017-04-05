import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import store from './store/configureStore';

import theme from '../public/react-toolbox/theme';

import App from './components/App';

import '../public/react-toolbox/theme.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Route exact path="/" component={App}/>
        </div>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
