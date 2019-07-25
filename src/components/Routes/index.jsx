import React from 'react';
import {Switch, Route} from 'react-router-dom';
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

export default function() {
  return (
    <Switch>
      {routes.map(route => (
        <Route key={route.name} path={route.path} component={route.component} />
      ))}
    </Switch>
  );
}
