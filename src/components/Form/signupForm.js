import Envelope from '../../svg/envelope.svg';
import Key from '../../svg/key.svg';

export default [
  {
    fields: [
      {
        name: 'first name',
        formField: 'firstName',
        type: 'text',
        width: 12,
        svg: Envelope,
      },
      {
        name: 'last name',
        formField: 'lastName',
        type: 'text',
        width: 12,
        svg: Key,
      },
      {
        name: 'email address',
        formField: 'email',
        type: 'text',
        width: 12,
        svg: Key,
      },
      {
        name: 'location',
        formField: 'location',
        type: 'text',
        width: 12,
        svg: Key,
      },
      {
        name: 'phone number',
        formField: 'phone',
        type: 'tel',
        width: 12,
        svg: Key,
      },
    ],
    submitName: 'next',
  },
  {
    fields: [
      {
        name: 'address line 1',
        formField: 'addressLine1',
        type: 'text',
        width: 12,
        svg: Envelope,
      },
      {
        name: 'address line 2',
        formField: 'addressLine2',
        type: 'text',
        width: 12,
        svg: Key,
      },
      {
        name: 'city',
        formField: 'city',
        type: 'text',
        width: 12,
        svg: Key,
      },
      {
        name: 'state',
        formField: 'state',
        type: 'text',
        width: 12,
        svg: Key,
      },
      {
        name: 'zip code',
        formField: 'zip',
        type: 'tel',
        width: 12,
        svg: Key,
      },
    ],
    submitName: 'next',
  },
  {
    fields: [],
    submitName: 'next',
  },
  {
    fields: [],
    submitName: 'next',
  },
  {
    fields: [],
    submitName: 'signup',
  },
];
