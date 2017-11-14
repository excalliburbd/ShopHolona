import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Loader from './Loader';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ props => {
    if (rest.isVendor) {
      return <Component {...props}/>
    }

    if (!rest.loading) {
      return <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    }

    return <Loader />;
  }}/>
)

export default AuthRoute;
