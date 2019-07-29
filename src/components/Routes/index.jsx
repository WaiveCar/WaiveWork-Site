import React from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Login from '../Login';
import Signup from '../Signup';

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  {
    name: 'Singup',
    path: '/signup',
    component: Signup,
  },
];

function Routes({ loggedIn }) {
  return (
    <Switch>
      <Route
        exact
        path={'/'}
        render={() =>
          loggedIn ? <Redirect to={'/dashboard'} /> : <Redirect to={'/login'} />
        }
      />
      {routes.map((route) => (
        <Route key={route.name} path={route.path} component={route.component} />
      ))}
    </Switch>
  );
}

export default Routes;
