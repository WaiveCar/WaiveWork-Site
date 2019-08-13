import Envelope from '../../svg/envelope.svg';
import Key from '../../svg/key.svg';

export default [
  {
    title: 'First, please tell us a bit more about yourself',
    fields: [
      {
        name: 'first name',
        formField: 'firstName',
        type: 'text',
        width: 8,
        svg: Envelope,
      },
      {
        name: 'last name',
        formField: 'lastName',
        type: 'text',
        width: 8,
        svg: Key,
      },
      {
        name: 'email address',
        formField: 'email',
        type: 'text',
        width: 8,
        svg: Key,
      },
      {
        name: 'location',
        formField: 'placeName',
        type: 'text',
        width: 8,
        svg: Key,
      },
      {
        name: 'phone number',
        formField: 'phone',
        type: 'tel',
        width: 8,
        svg: Key,
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
        width: 8,
        svg: Envelope,
      },
      {
        name: 'address line 2',
        formField: 'street2',
        type: 'text',
        width: 8,
        svg: Key,
      },
      {
        name: 'city',
        formField: 'city',
        type: 'text',
        width: 8,
        svg: Key,
      },
      {
        name: 'state',
        formField: 'state',
        type: 'text',
        width: 8,
        svg: Key,
      },
      {
        name: 'zip code',
        formField: 'zip',
        type: 'number',
        width: 8,
        svg: Key,
      },
    ],
    submitName: 'next',
  },
  {
    title: 'What is your driver’s license information?',
    fields: [
      {
        name: 'license number',
        formField: 'number',
        type: 'text',
        width: 8,
        svg: Envelope,
      },
      {
        name: 'license state',
        formField: 'licenseState',
        type: 'text',
        width: 8,
        svg: Key,
      },
      {
        name: 'birthday',
        formField: 'birthDate',
        type: 'text',
        width: 8,
        svg: Key,
      },
      {
        name: 'license expiration',
        formField: 'expiration',
        type: 'text',
        width: 8,
        svg: Key,
      },
    ],
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
      },
      {
        name: 'price per week',
        formField: 'offerPerWeek',
        type: 'number',
        width: 2,
        label: 'How much would you be willing to pay per week?',
      },
      {
        name: 'for rideshare',
        formField: 'rideshare',
        type: 'radio',
        label: 'Will you be driving for rideshare services?',
        width: 8,
      },
    ],
    submitName: 'next',
  },
  {
    title:
      'We have a fleet of Hyundai Ioniqs which are otherwise identical except some are hybrid and electric.',
    body: `
    <div>
      1) Electric
      <ul>
        <li>140 mile range</li>
        <li>5mi charge/hr slow charger included</li>
        <li>20 minutes to fast charge to 75% ($.25/minute)</li>
      </ul>
      2) Hybrid
      <ul>
        <li>60mpg</li>
        <li>600 miles/tank</li>
      </ul>
    </div>
    `,
    fields: [
      {
        name: 'for rideshare',
        formField: 'wantsElectric',
        type: 'radio',
        label: 'Are you interested in using an electric car?',
        width: 8,
      },
    ],
    submitName: 'submit',
  },
];
