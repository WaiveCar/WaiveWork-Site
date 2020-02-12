export default [
  {
    title: 'First, please tell us a bit more about yourself',
    fields: [
      {
        name: 'first name',
        formField: 'firstName',
        type: 'text',
        width: 12,
      },
      {
        name: 'last name',
        formField: 'lastName',
        type: 'text',
        width: 12,
      },
      {
        name: 'email address',
        formField: 'email',
        type: 'email',
        width: 12,
      },
      {
        name: 'what zip code will you be driving in?',
        formField: 'placeName',
        type: 'text',
        width: 12,
      },
      {
        name: 'phone number',
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
        name: 'address line 1',
        formField: 'street1',
        type: 'text',
        width: 12,
      },
      {
        name: 'address line 2',
        formField: 'street2',
        type: 'text',
        width: 12,
        optional: true,
      },
      {
        name: 'city',
        formField: 'city',
        type: 'text',
        width: 12,
      },
      {
        name: 'state',
        formField: 'state',
        type: 'text',
        width: 12,
      },
      {
        name: 'zip code',
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
        name: 'license number',
        formField: 'number',
        type: 'text',
        width: 12,
      },
      {
        name: 'license state',
        formField: 'licenseState',
        type: 'text',
        width: 12,
      },
      {
        name: 'birthday',
        label: 'birthday',
        formField: 'birthDate',
        type: 'date',
        labelWidth: 4,
        width: 8,
      },
      {
        name: 'license expiration',
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
        name: 'driving experience',
        formField: 'experience',
        type: 'number',
        width: 2,
        label: 'How many years of driving experience do you have?',
        optional: true,
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
  /*
  This section is currently commented out, as we are not giving out any electrics to users for the time being
  {
    title:
      'We have a fleet of Hyundai Ioniqs which are otherwise identical except some are hybrid and electric.',
    body: `
    <div class="mt-4">
      1) Electric
      <ul>
        <li>140 mile range</li>
        <li>5mi charge/hr slow charger included</li>
        <li>20 minutes to fast charge to 75% ($.25/minute)</li>
      </ul>
      2) Hybrid
      <ul class="mt-2">
        <li>60mpg</li>
        <li>600 miles/tank</li>
      </ul>
    </div>
    `,
    fields: [
      {
        name: 'wants electric',
        formField: 'wantsElectric',
        type: 'radio',
        label: 'Are you interested in using an electric car?',
        width: 12,
      },
    ],
    altActionName: 'back',
    submitName: 'submit',
  },*/
];
