import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

function RequireAuth(props) {
  const { loggedIn, path, component } = props;
  return loggedIn ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={'/login'} />
  );
}

export default RequireAuth;
