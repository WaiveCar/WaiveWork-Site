import React from 'react';
import Login from '../Login';
import Signup from '../Signup';
import Dashboard from '../Dashboard';
import Thanks from '../Thanks';

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
    component: Dashboard,
    requireAuth: true,
  },
  {
    name: 'Thanks',
    path: '/thanks',
    component: Thanks,
    requireAuth: false,
  },
  {
    name: 'Wildcard',
    path: '/*',
    component: Dashboard,
    requireAuth: true,
  },
];
