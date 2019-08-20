import Envelope from '../../svg/envelope.svg';
import Key from '../../svg/key.svg';
import signupForm from '../../components/Form/signupForm';
import loginForm from '../../components/Form/loginForm';
import authFormFields from '../../components/Form/authFormFields';

const initialState = {
  authForm: { ...authFormFields },
  loginFormFields: loginForm,
  signupFormPages: signupForm,
  selectedSignupPage: 0,
  loggedIn: false,
  authChecked: false,
  user: null,
  currentBooking: null,
  car: null,
  registrationFile: null,
  inspectionFile: null,
  insuranceFile: null,
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
    case 'CHANGE_SIGNUP_PAGE':
      return {
        ...state,
        selectedSignupPage: payload.selectedSignupPage,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: payload.user,
      };
    case 'UPDATE_CURRENT_BOOKING':
      return {
        ...state,
        currentBooking: payload.currentBooking,
        car: payload.currentBooking.car,
      };
    case 'UPDATE_REGISTRATION':
      return {
        ...state,
        registrationFile: payload.registrationFile,
      };
    case 'UPDATE_INSPECTION':
      return {
        ...state,
        inspectionFile: payload.inspectionFile,
      };
    case 'UPDATE_INSURANCE':
      return {
        ...state,
        insuranceFile: payload.insuranceFiles[0],
      };
    default:
      return state;
  }
}

export default userReducer;
