import React from 'react';
import Login from '../Login';
import Signup from '../Signup';
import Dashboard from '../Dashboard';
import Thanks from '../Thanks';
import Doc from '../Doc';
import Chargers from '../Chargers';
import Booking from '../Booking';
import BookingPayments from '../Booking/BookingPayments';
import Cards from '../Cards';

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
    name: 'Booking',
    path: '/booking',
    component: Booking,
    requireAuth: true,
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
    requireAuth: true,
  },
  {
    name: 'Payments',
    path: '/payments',
    component: BookingPayments,
    requireAuth: true,
  },
  {
    name: 'Cards',
    path: '/cards',
    component: Cards,
    requireAuth: true,
  },
  // This must remain the last in this list
  {
    name: 'Wildcard',
    path: '/*',
    component: Dashboard,
    requireAuth: true,
  },
];
