import React from 'react';
import Login from '../Login';
import Signup from '../Signup';
import Dashboard from '../Dashboard';
import Thanks from '../Thanks';
import Doc from '../Doc';
import Chargers from '../Chargers';

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
    name: 'Registration',
    path: '/registration',
    component: () => <Doc type={'registration'} />,
    requireAuth: true,
  },
  {
    name: 'Insurance',
    path: '/insurance',
    component: () => <Doc type={'insurance'} />,
    requireAuth: true,
  },
  {
    name: 'Inspection',
    path: '/inspection',
    component: () => <Doc type={'inspection'} />,
    requireAuth: true,
  },
  {
    name: 'Chargers',
    path: '/chargers',
    component: Chargers,
    requireAuth: false,
  },
  // This must remain the last in this list
  {
    name: 'Wildcard',
    path: '/*',
    component: Dashboard,
    requireAuth: true,
  },
];
