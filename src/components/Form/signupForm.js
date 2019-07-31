import Envelope from '../../svg/envelope.svg';
import Key from '../../svg/key.svg';
import signupForm from '../../components/Form/signupForm';

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
    fields: [],
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
