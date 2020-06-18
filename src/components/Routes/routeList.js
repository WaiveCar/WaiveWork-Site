import React from 'react';
import Login from '../Login';
import Signup from '../Signup';
import Dashboard from '../Dashboard';
import Thanks from '../Thanks';
import Doc from '../Doc';
import Chargers from '../Chargers';
import Contact from '../Contact';
import Booking from '../Booking';
import BookingPayments from '../Booking/BookingPayments';
import Cards from '../Cards';
import Personal from '../Personal';
import ChangePassword from '../ChangePassword';
import License from '../License';
import Wizard from '../Wizard';

export default [
  {
    name: 'Login',
    path: '/login',
    component: Login,
    requireAuth: false,
  },
  {
    name: 'Login',
    path: '/login/:organizationName',
    component: Organization,
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
  /* Chargers are being commented out to potentially be added back in later, but for now
   * we are discontinuing electric cars
  {
    name: 'Chargers',
    path: '/chargers',
    component: Chargers,
    requireAuth: true,
  },
  */
  /* The route below is needed to be added later, but the initial version of
   * this app will not have a list of all the payments. It will only initially 
   * have a list of payments from the current booking
  {
    name: 'Payments',
    path: '/payments',
    component: BookingPayments,
    requireAuth: true,
  },
  */
  {
    name: 'Cards',
    path: '/cards',
    component: Cards,
    requireAuth: true,
  },
  {
    name: 'Personal',
    path: '/personal',
    component: Personal,
    requireAuth: true,
  },
  {
    name: 'Change Password',
    path: '/change-password',
    component: ChangePassword,
    requireAuth: true,
  },
  {
    name: 'Update License',
    path: '/license',
    component: License,
    requireAuth: true,
  },
  {
    name: 'Contact Us',
    path: '/contact',
    component: Contact,
    requireAuth: true,
  },
  {
    name: 'Wizard',
    path: '/wizard',
    component: Wizard,
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
