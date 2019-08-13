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
        formField: 'location',
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
        formField: 'addressLine1',
        type: 'text',
        width: 8,
        svg: Envelope,
      },
      {
        name: 'address line 2',
        formField: 'addressLine2',
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
        formField: 'licenseNumber',
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
        formField: 'birthday',
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
        name: 'price per day',
        formField: 'perDay',
        type: 'number',
        width: 2,
        label: 'How much would you be willing to pay per day?',
      },
      {
        name: 'for rideshare',
        formField: 'forRideshare',
        type: 'radio',
        label: 'Will you be driving for rideshare services?',
        width: 8,
      },
    ],
    submitName: 'submit',
  },
];
