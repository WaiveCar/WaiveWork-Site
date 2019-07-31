import Envelope from '../../svg/envelope.svg';
import Key from '../../svg/key.svg';

const initialState = {
  authForm: {},
  loginFormFields: [
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
  ],
  signupFormPages: [
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
          type: 'text',
          width: 12,
          svg: Key,
        },
      ],
      submitName: 'next',
    },
    {
      fields: [],
    },
    {
      fields: [],
    },
    {
      fields: [],
    },
    {
      fields: [],
    },
  ],
  selectedSignupPage: 0,
  loggedIn: false,
  authChecked: false,
};

function userReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_FORM':
      const { form } = state;
      return {
        ...state,
        [payload.formName]: {
          ...state[payload.formName],
          [payload.field]: payload.value,
        },
      };
    case 'TOGGLE_LOGIN':
      return {
        ...state,
        loggedIn: payload.loggedIn,
      };
    case 'TOGGLE_AUTH_CHECKED':
      return {
        ...state,
        authChecked: payload.authChecked,
      };
    case 'CLEAR_FORM':
      return {
        ...state,
        [payload.formName]: { ...initialState[payload.formName] },
      };
    case 'CHANGE_SELECTED_PAGE':
      return {
        ...state,
        selectedSignupPage: payload.selectedSignupPage,
      };
    default:
      return state;
  }
}

export default userReducer;
