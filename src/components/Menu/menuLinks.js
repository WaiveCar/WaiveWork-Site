export default {
  Bookings: {
    expanded: false,
    children: [
      {
        name: 'Information',
        href: '/booking',
      },
      /* Electric cars are being discontinued for the time being
      {
        name: 'Chargers',
        href: '/chargers',
      },
      */
      {
        name: 'Registration',
        href: '/registration',
      },
      {
        name: 'Insurance',
        href: '/insurance',
      },
      {
        name: 'Rideshare Doc',
        href: '/inspection',
      },
    ],
  },
  Account: {
    expanded: false,
    children: [
      {
        name: 'Personal Info',
        href: '/personal',
      },
      {
        name: 'My Cards',
        href: '/cards',
      },
      {
        name: 'My License',
        href: '/license',
      },
      {
        name: 'Change Password',
        href: '/change-password',
      },
    ],
  },
  Contact: {
    expanded: false,
    href: '/contact',
  },
};
