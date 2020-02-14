export default [
  {
    title: 'First, please tell us a bit more about yourself',
    fields: [
      {
        name: 'First Name',
        formField: 'firstName',
        type: 'text',
        width: 12,
      },
      {
        name: 'Last Name',
        formField: 'lastName',
        type: 'text',
        width: 12,
      },
      {
        name: 'Email Address',
        formField: 'email',
        type: 'email',
        width: 12,
      },
      {
        name: 'Phone Number',
        formField: 'phone',
        type: 'tel',
        width: 12,
      },
    ],
    submitName: 'next',
  },
  {
    title: 'What is the address where the car will be stored?',
    fields: [
      {
        name: 'Address Line 1',
        formField: 'street1',
        type: 'text',
        width: 12,
      },
      {
        name: 'Address Line 2',
        formField: 'street2',
        type: 'text',
        width: 12,
        optional: true,
      },
      {
        name: 'City',
        formField: 'city',
        type: 'text',
        width: 12,
      },
      {
        name: 'State',
        formField: 'state',
        type: 'text',
        width: 12,
      },
      {
        name: 'Zip Code',
        formField: 'zip',
        type: 'text',
        width: 12,
      },
    ],
    submitName: 'next',
    altActionName: 'back',
  },
  {
    title: 'What is your driver’s license information?',
    fields: [
      {
        name: 'License Number',
        formField: 'number',
        type: 'text',
        width: 12,
      },
      {
        name: 'License State',
        formField: 'licenseState',
        type: 'text',
        width: 12,
      },
      {
        name: 'Birthday',
        label: 'birthday',
        formField: 'birthDate',
        type: 'date',
        labelWidth: 4,
        width: 8,
      },
      {
        name: 'License Expiration',
        label: 'expiration',
        formField: 'expiration',
        type: 'date',
        labelWidth: 4,
        width: 8,
      },
    ],
    altActionName: 'back',
    submitName: 'next',
  },
  {
    title: 'Just a couple more questions before we are done.',
    fields: [
      {
        name: 'Zip code will you be driving in?',
        formField: 'placeName',
        type: 'text',
        width: 12,
      },
      {
        name: 'for rideshare',
        formField: 'rideshare',
        type: 'radio',
        label: 'Will you be driving for rideshare services?',
        width: 12,
      },
    ],
    altActionName: 'back',
    submitName: 'submit',
  },
];
