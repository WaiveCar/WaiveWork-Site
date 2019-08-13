import Envelope from '../../svg/envelope.svg';
import Key from '../../svg/key.svg';

export default [
  {
    name: 'email',
    formField: 'email',
    type: 'text',
    width: 12,
    svg: Envelope,
  },
  {
    name: 'password',
    formField: 'password',
    type: 'password',
    width: 12,
    svg: Key,
  },
];