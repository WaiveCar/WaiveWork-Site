import React from 'react';
import Login from '../Login';
import Signup from '../Signup';

export default [
  {
    name: 'Login',
    path: '/login',
    component: Login,
    requireAuth: false,
  },
  {
    name: 'Singup',
    path: '/signup',
    component: Signup,
    requireAuth: false,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => <div>dashboard</div>,
    requireAuth: true,
  },
  {
    name: '1',
    path: '/1',
    component: () => <div>1</div>,
    requireAuth: false,
  },
];
