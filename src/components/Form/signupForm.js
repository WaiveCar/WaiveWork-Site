export default [
  {
    title: 'Start Driving in a Few Easy Steps.',
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
    submitName: 'NEXT',
  },
  {
    title: 'Start Driving in a Few Easy Steps.',
    fields: [
      {
        name: 'Address where your car is stored?',
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
      [
        {
          name: 'State',
          formField: 'state',
          type: 'text',
          width: 6,
        },
        {
          name: 'Zip',
          formField: 'zip',
          type: 'text',
          width: 6,
        },
      ],
    ],
    submitName: 'NEXT',
    altActionName: 'BACK',
  },
  {
    title: 'Start Driving in a Few Easy Steps.',
    fields: [
      {
        name: "Driver's License Number",
        formField: 'number',
        type: 'text',
        width: 12,
      },
      {
        name: 'Issued State',
        formField: 'licenseState',
        type: 'text',
        width: 12,
      },
      {
        name: 'Expiration Date',
        formField: 'expiration',
        type: 'date',
        width: 12,
      },
      {
        name: 'Date of Birth',
        formField: 'birthDate',
        type: 'date',
        width: 12,
      },
    ],
    altActionName: 'BACK',
    submitName: 'NEXT',
  },
  {
    title: 'Start Driving in a Few Easy Steps.',
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
    altActionName: 'BACK',
    submitName: 'SUBMIT',
  },
];
